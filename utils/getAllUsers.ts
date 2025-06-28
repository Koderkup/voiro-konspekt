import { firestore } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { User } from "../types/user.dto";

export const getAllUsers = async (): Promise<User[]> => {
  const auth = getAuth();
  if (auth.currentUser) {
    try {
      const usersCollection = collection(firestore, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          uid: data.uid,
          email: data.email,
          surname: data.surname || "",
          username: data.username,
          fullName: data.fullName,
          role: data.role || "guest",
          profilePicURL: data.profilePicURL || "",
          accessibleNotes: data.accessibleNotes || [],
          createdAt: data.createdAt || Date.now(),
        } as User;
      });
      console.log("Список пользователей: ", usersList);
      return usersList;
    } catch (error) {
      console.error("Ошибка при получении пользователей: ", error);
      return [];
    }
  } else {
    console.log("Пользователь не авторизован");
    return []; 
  }
};
