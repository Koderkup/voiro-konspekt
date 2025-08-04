"use client";
import { Flex, Image, Text } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../firebase/firebase";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { User, GoogleAuthProps } from "../../types/user.dto";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const GoogleAuth = ({ prefix }: GoogleAuthProps) => {
  const [signInWithGoogle, , , error] = useSignInWithGoogle(auth);
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);
  const router = useRouter();
  const handleGoogleAuth = async () => {
    try {
      const newUser = await signInWithGoogle();
      if (!newUser && error) {
        showToast("Error", error.message, "error");
        return false;
      }
      if (!newUser) {
        showToast("Error", "Ошибка входа через Google", "error");
        return false;
      }
      const userRef = doc(firestore, "users", newUser.user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        // login
        const userDoc = userSnap.data();
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        Cookies.set("user-info", JSON.stringify(userDoc), {
          expires: 30,
          path: "/",
        });
        loginUser(userDoc);
        router.push("/");
      } else {
        // signup
        const userDoc: User = {
          uid: newUser.user.uid,
          email: newUser.user.email || "",
          surname: "",
          username: newUser.user.email?.split("@")[0] || "",
          fullName: newUser.user.displayName || "Без имени",
          role: "guest",
          profilePicURL: newUser.user.photoURL || "",
          accessibleNotes: [],
          createdAt: Date.now(),
        };
        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        Cookies.set("user-info", JSON.stringify(userDoc), {
          expires: 30,
          path: "/",
        });
        loginUser(userDoc);
        router.push("/");
      }
    } catch (error) {
      showToast("Error", (error as Error).message, "error");
      return false;
    }
  };

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      cursor={"pointer"}
      onClick={handleGoogleAuth}
    >
      <Image src="images/google.png" w={5} alt="Google logo" />
      <Text mx="2" color={"blue.500"}>
        {prefix} через Google
      </Text>
    </Flex>
  );
};

export default GoogleAuth;
