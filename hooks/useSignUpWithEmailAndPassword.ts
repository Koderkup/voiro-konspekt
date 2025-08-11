// import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
// import { auth, firestore } from "../firebase/firebase";
// import {
//   collection,
//   doc,
//   getDocs,
//   query,
//   setDoc,
//   where,
// } from "firebase/firestore";
// import useShowToast from "./useShowToast";
// import useAuthStore from "../store/authStore";
// import { User, SignUpInputs } from "../types/user.dto";
// import Cookies from "js-cookie";


// const useSignUpWithEmailAndPassword = () => {
//   const [createUserWithEmailAndPassword, , loading, error] =
//     useCreateUserWithEmailAndPassword(auth);
//   const showToast = useShowToast();
//   const loginUser = useAuthStore((state) => state.login);

//   const signup = async (inputs: SignUpInputs) => {
//     if (
//       !inputs.email ||
//       !inputs.password ||
//       !inputs.surname ||
//       !inputs.fullName
//     ) {
//       showToast("Ошибка", "Пожалуйста, заполните все поля !", "error");
//       return false;
//     }

//     const usersRef = collection(firestore, "users");

//     const q = query(usersRef, where("email", "==", inputs.email));
//     const querySnapshot = await getDocs(q);

//     if (!querySnapshot.empty) {
//       showToast("Error", "Username already exists", "error");
//       return false;
//     }

//     try {
//       const newUser = await createUserWithEmailAndPassword(
//         inputs.email,
//         inputs.password
//       );
//       if (!newUser && error) {
//         showToast("Error", error.message, "error");
//         return false;
//       }
//       if (newUser) {
//         const userDoc: User = {
//           uid: newUser.user.uid,
//           email: inputs.email,
//           surname: inputs.surname || "",
//           username: inputs.email.split("@")[0],
//           fullName: inputs.fullName,
//           role: "guest",
//           profilePicURL: "",
//           accessibleNotes: [],
//           createdAt: Date.now(),
//         };
//         await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
//         localStorage.setItem("user-info", JSON.stringify(userDoc));
//         Cookies.set("user-info", JSON.stringify(userDoc), {
//           expires: 30, 
//           path: "/", 
//         });
//         loginUser(userDoc);
//         return true;
//       }
//     } catch (error) {
//       if (error instanceof Error) {
//         showToast("Error", error.message, "error");
//       } else {
//         showToast("Error", "An unexpected error occurred", "error");
//       }
//       return false;
//     }
//   };
//   return { loading, error, signup };
// };

// export default useSignUpWithEmailAndPassword;
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../firebase/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { User, SignUpInputs } from "../types/user.dto";
import Cookies from "js-cookie";
import { useState } from "react";

type UseSignUpHook = {
  signup: (inputs: SignUpInputs) => Promise<boolean>;
  loading: boolean;
  error: Error | null;
};

const useSignUpWithEmailAndPassword = (): UseSignUpHook => {
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const signup = async (inputs: SignUpInputs): Promise<boolean> => {
    console.log("[SIGNUP] Старт регистрации", inputs);
    setLoading(true);
    setError(null);

    if (
      !inputs.email ||
      !inputs.password ||
      !inputs.surname ||
      !inputs.fullName
    ) {
      showToast("Ошибка", "Пожалуйста, заполните все поля!", "error");
      console.warn("[SIGNUP] Не все поля заполнены");
      setLoading(false);
      return false;
    }

    try {
      const usersRef = collection(firestore, "users");
      const q = query(usersRef, where("email", "==", inputs.email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        showToast(
          "Ошибка",
          "Пользователь с таким email уже существует",
          "error"
        );
        console.warn("[SIGNUP] Email уже зарегистрирован:", inputs.email);
        setLoading(false);
        return false;
      }
    } catch (err) {
      console.error("[SIGNUP] Ошибка при проверке Firestore:", err);
      showToast("Ошибка", "Не удалось проверить пользователя", "error");
      setError(
        err instanceof Error ? err : new Error("Unknown Firestore error")
      );
      setLoading(false);
      return false;
    }

    let newUserCred;
    try {
      newUserCred = await createUserWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password
      );
      console.log("[SIGNUP] Пользователь создан:", newUserCred.user.uid);
    } catch (err) {
      console.error("[SIGNUP] Ошибка при создании пользователя:", err);
      const message =
        err instanceof Error ? err.message : "Не удалось создать аккаунт";
      showToast("Ошибка", message, "error");
      setError(err instanceof Error ? err : new Error("Unknown Auth error"));
      setLoading(false);
      return false;
    }

    if (!auth.currentUser) {
      console.error(
        "[SIGNUP] Нет авторизованного пользователя после регистрации"
      );
      showToast("Ошибка", "Авторизация не завершена", "error");
      setError(new Error("Нет авторизованного пользователя"));
      setLoading(false);
      return false;
    }

    try {
      const token = await auth.currentUser.getIdToken(true);
      console.log("[SIGNUP] ID токен получен:", !!token);
    } catch (err) {
      console.error("[SIGNUP] Не удалось получить токен:", err);
      showToast("Ошибка", "Не удалось получить токен авторизации", "error");
      setError(
        err instanceof Error ? err : new Error("Ошибка получения токена")
      );
      setLoading(false);
      return false;
    }

    const userDoc: User = {
      uid: newUserCred.user.uid,
      email: inputs.email,
      surname: inputs.surname,
      username: inputs.email.split("@")[0],
      fullName: inputs.fullName,
      role: "guest",
      profilePicURL: "",
      accessibleNotes: [],
      createdAt: Date.now(),
    };

    try {
      await setDoc(doc(firestore, "users", newUserCred.user.uid), userDoc);
      console.log("[SIGNUP] Документ пользователя успешно записан");
    } catch (err) {
      console.error(
        "[SIGNUP] Ошибка при записи пользователя в Firestore:",
        err
      );
      showToast("Ошибка", "Не удалось сохранить данные профиля", "error");
      setError(
        err instanceof Error ? err : new Error("Ошибка записи в Firestore")
      );
      setLoading(false);
      return false;
    }

    try {
      localStorage.setItem("user-info", JSON.stringify(userDoc));
      Cookies.set("user-info", JSON.stringify(userDoc), {
        expires: 30,
        path: "/",
      });
    } catch (err) {
      console.warn(
        "[SIGNUP] Не удалось записать в localStorage или cookies:",
        err
      );
    }

    loginUser(userDoc);
    console.log("[SIGNUP] Регистрация завершена ✅");
    setLoading(false);
    return true;
  };

  return { signup, loading, error };
};

export default useSignUpWithEmailAndPassword;
