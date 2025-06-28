"use client";
import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase/firebase";
import { Wrap } from "@chakra-ui/react";
import { User } from "../../types/user.dto";
import { deleteDoc, doc } from "firebase/firestore";
import UserCard from "../../components/userCard/userCard";
import FilterUsers from "../../components/filterUsers/FilterUsers";
import { getAllUsers } from "../../utils/getAllUsers";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loading from "../../components/Loading/Loading";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();

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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const usersList = await getAllUsers();
        setUsers(usersList);
      } else {
        console.log("Пользователь не авторизован");
        setUsers([]);
      }
      setIsLoading(false); // Устанавливаем состояние загрузки в false после выполнения
    });

    return () => unsubscribe();
  }, [auth]);

  // Отображаем индикатор загрузки
  if (isLoading) {
    return <Loading />;
  }

  // Отображаем пользователей
  return (
    <>
      <FilterUsers />
      <Wrap my={4} justify="center" align="center">
        {users.map((user) => (
          <UserCard
            key={user.uid}
            user={user}
            onUserDeleted={handleUserDeleted}
          />
        ))}
      </Wrap>
    </>
  );
};

export default Users;
