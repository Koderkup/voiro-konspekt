import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast";
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";
import Cookies from "js-cookie";


const useLogin = () => {
  const showToast = useShowToast();
  const [signInWithEmailAndPassword, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const loginUser = useAuthStore((state) => state.login);

  const login = async (inputs) => {
    if (!inputs.email || !inputs.password) {
      return showToast("Ошибка", "Пожалуйста, заполните все поля !", "error");
    }
    try {
      const userCred = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );

      if (userCred) {
        const docRef = doc(firestore, "users", userCred.user.uid);
        const docSnap = await getDoc(docRef);
        const userData = docSnap.data();
         localStorage.setItem("user-info", JSON.stringify(userData));

       Cookies.set("user-info", JSON.stringify(userDoc), {
         expires: 30, 
         path: "/", 
       });
        loginUser(userData);
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  const loginWithGoogle = async () => {
    try {
      const userCred = await useSignInWithGoogle();

      if (userCred) {
        const docRef = doc(firestore, "users", userCred.user.uid);
        const docSnap = await getDoc(docRef);
        const userData = docSnap.data();
        localStorage.setItem("user-info", JSON.stringify(userData));

        Cookies.set("user-info", JSON.stringify(userData), {
          expires: 30,
          path: "/",
        });
        loginUser(userData);
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return { loading, error, login, loginWithGoogle };
};

export default useLogin;
