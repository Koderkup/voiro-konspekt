import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
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
