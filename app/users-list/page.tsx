"use client";
import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import UserCard from "../../components/userCard/userCard";
import { Wrap } from "@chakra-ui/react";
import { User } from "../../types/user.dto";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
const Users = () => {
  const auth = getAuth();
  const [users, setUsers] = useState<User[]>([]);
  const handleUserDeleted = async (userId: string) => {
    try {
      const userRef = doc(firestore, "users", userId);
      await deleteDoc(userRef);
      setUsers(users.filter((user) => user.uid !== userId));
    } catch (error) {
      console.error("Ошибка при удалении пользователя: ", error);
    }
  };
  useEffect(() => {
    const getAllUsers = async () => {
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

          setUsers(usersList);
          console.log("Список пользователей: ", usersList);
        } catch (error) {
          console.error("Ошибка при получении пользователей: ", error);
        }
      } else {
        console.log("Пользователь не авторизован");
      }
    };

    getAllUsers();
  }, [auth]);

  return (
    <Wrap my={4} justify="center" align="center">
      {users.map((user, index) => (
        <UserCard key={index} user={user} onUserDeleted={handleUserDeleted} />
      ))}
    </Wrap>
  );
};

export default Users;
