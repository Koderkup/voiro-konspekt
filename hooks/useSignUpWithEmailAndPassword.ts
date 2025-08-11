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



import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
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
    if (
      !inputs.email ||
      !inputs.password ||
      !inputs.surname ||
      !inputs.fullName
    ) {
      showToast("Ошибка", "Пожалуйста, заполните все поля!", "error");
      return false;
    }

    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("email", "==", inputs.email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      showToast("Ошибка", "Пользователь с таким email уже существует", "error");
      return false;
    }

    try {
      // Создаём пользователя
      const newUserCred = await createUserWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password
      );

      // Гарантируем авторизацию
      await signInWithEmailAndPassword(auth, inputs.email, inputs.password);

      // Обновляем токен
      await auth.currentUser?.getIdToken(true);

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

      await setDoc(doc(firestore, "users", newUserCred.user.uid), userDoc);

      localStorage.setItem("user-info", JSON.stringify(userDoc));
      Cookies.set("user-info", JSON.stringify(userDoc), {
        expires: 30,
        path: "/",
      });

      loginUser(userDoc);
      return true;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      showToast("Ошибка", message, "error");
      return false;
    }
  };

  return { signup };
};

export default useSignUpWithEmailAndPassword;
