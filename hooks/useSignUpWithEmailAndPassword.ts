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

const useSignUpWithEmailAndPassword = () => {
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);

  const signup = async (inputs: SignUpInputs) => {
    console.log("[SIGNUP] Старт регистрации", inputs);

    // 1. Проверка полей
    if (
      !inputs.email ||
      !inputs.password ||
      !inputs.surname ||
      !inputs.fullName
    ) {
      showToast("Ошибка", "Пожалуйста, заполните все поля!", "error");
      console.warn("[SIGNUP] Не все поля заполнены");
      return false;
    }

    // 2. Проверка дубликата email в Firestore
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
        return false;
      }
    } catch (err) {
      console.error("[SIGNUP] Ошибка при проверке Firestore:", err);
      showToast("Ошибка", "Не удалось проверить пользователя", "error");
      return false;
    }

    // 3. Создание пользователя в Firebase Auth
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
      showToast(
        "Ошибка",
        err instanceof Error ? err.message : "Не удалось создать аккаунт",
        "error"
      );
      return false;
    }

    // 4. Проверяем авторизацию
    if (!auth.currentUser) {
      console.error(
        "[SIGNUP] Нет авторизованного пользователя после регистрации"
      );
      showToast("Ошибка", "Авторизация не завершена", "error");
      return false;
    }

    // 5. Получение токена
    try {
      const token = await auth.currentUser.getIdToken(true);
      console.log("[SIGNUP] ID токен получен:", !!token);
    } catch (err) {
      console.error("[SIGNUP] Не удалось получить токен:", err);
      showToast("Ошибка", "Не удалось получить токен авторизации", "error");
      return false;
    }

    // 6. Создание документа пользователя в Firestore
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
      return false;
    }

    // 7. Сохраняем локально
    try {
      localStorage.setItem("user-info", JSON.stringify(userDoc));
    } catch (err) {
      console.warn("[SIGNUP] Не удалось записать в localStorage:", err);
    }

    try {
      Cookies.set("user-info", JSON.stringify(userDoc), {
        expires: 30,
        path: "/",
      });
    } catch (err) {
      console.warn("[SIGNUP] Не удалось записать в cookies:", err);
    }

    // 8. Обновляем состояние в сторе
    loginUser(userDoc);

    console.log("[SIGNUP] Регистрация завершена ✅");
    return true;
  };

  return { signup };
};

export default useSignUpWithEmailAndPassword;