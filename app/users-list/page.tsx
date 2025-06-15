'use client'
import { firestore } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import React, { useEffect } from "react";

const Users = () => {
  const auth = getAuth();
  useEffect(() => {
    const getAllUsers = async () => {
      if (auth.currentUser) {
        try {
          const usersCollection = collection(firestore, "users");
          const usersSnapshot = await getDocs(usersCollection);
          const usersList = usersSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        } catch (error) {
          console.error("Ошибка при получении пользователей: ", error);
        }
      } else {
        console.log("Пользователь не авторизован");
      }
    };

    getAllUsers();
  }, [auth]);

  return <div>Users</div>;
};

export default Users;
