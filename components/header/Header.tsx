"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Box,
  Stack,
  Heading,
  Flex,
  Text,
  Avatar,
  Button,
  Dialog,
  useDisclosure,
  Portal,
  CloseButton,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { ColorModeButton } from "../../components/ui/color-mode";
import { ImEnter, ImExit } from "react-icons/im";
import { Image as ChildImage } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useAuthStore from "../../store/authStore";
import { deleteUser, getAuth } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import { toaster } from "../../components/ui/toaster";
import {User} from "../../types/user.dto"

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [authUser, setAuthUser] = useState<User | null>(null);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleDeleteAccount = async () => {
    const auth = getAuth();
    const userToDelete = auth.currentUser;

    if (userToDelete) {
      const currentUserId = userToDelete.uid;
      const storedUserString = localStorage.getItem("user-info");

      if (storedUserString) {
        const storedUser = JSON.parse(storedUserString);

        if (storedUser && storedUser.uid === currentUserId) {
          deleteUser(userToDelete)
            .then(() => {
              toaster.create({
                title: "Аккаунт успешно удален.",
                type: "success",
              });
              logout();
              router.push("/");
            })
            .catch((error) => {
              toaster.create({
                title: "Ошибка при удалении профиля",
                type: "error",
              });
            });
        } else {
          toaster.create({
            title: "Пользователь не имеет прав на удаление этого аккаунта.",
            type: "error",
          });
        }
        await deleteDoc(doc(firestore, "users", currentUserId));
      } else {
        console.error("Данные пользователя не найдены.");
      }
    }
  };
  
  const handleLogout = () => {
    logout();
    router.push("/");
  };
  useEffect(() => {
    setAuthUser(user);
  }, [user]);
  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };
  const displayName =
    authUser &&
    (user?.fullName === "Без имени" ? user?.username : user?.fullName);
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg="rgba(37, 150, 194, 0.82)"
      color="white"
      position="relative"
      boxShadow="0 4px 10px rgba(0, 0, 0, 0.4)"
    >
      <Flex
        align="center"
        mr={5}
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
        padding={2}
        position={"relative"}
      >
        <ChildImage asChild>
          <Image
            src="/images/icons/icon-72x72.png"
            alt="VOIRO"
            width={52}
            height={52}
          />
        </ChildImage>
        <Heading as="h1" size="lg" letterSpacing="tighter" ml={5}>
          Конспект
        </Heading>
        <Box position="absolute" top="-1px" right="0px" zIndex="sticky">
          <ColorModeButton />
        </Box>
      </Flex>
      <Box
        display={{ base: "block", md: "none" }}
        onClick={onToggle}
        _hover={{ cursor: "pointer" }}
      >
        {isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
      </Box>
      <Stack
        direction={{ base: "column", md: "row" }}
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
      >
        <Link href="/" passHref>
          <Text
            _hover={{ cursor: "pointer", textDecoration: "underline" }}
            textDecoration={isActive("/") ? "underline" : "none"}
          >
            Главная
          </Text>
        </Link>
        <Link href="/workbook" passHref>
          <Text
            _hover={{ cursor: "pointer", textDecoration: "underline" }}
            textDecoration={isActive("/my-notes") ? "underline" : "none"}
          >
            Конспект
          </Text>
        </Link>
        <Link href="/tests" passHref>
          <Text
            _hover={{ cursor: "pointer", textDecoration: "underline" }}
            textDecoration={isActive("/tests") ? "underline" : "none"}
          >
            Тесты
          </Text>
        </Link>
        {authUser && authUser.role === "admin" && (
          <Link href="/users-list" passHref>
            <Text
              _hover={{ cursor: "pointer", textDecoration: "underline" }}
              textDecoration={isActive("/users-list") ? "underline" : "none"}
            >
              Студенты
            </Text>
          </Link>
        )}
        {authUser ? (
          <Flex align="center" display={{ base: "flex", md: "none" }}>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button variant="plain" size="sm">
                  <Avatar.Root>
                    <Avatar.Fallback name={user?.fullName} />
                    <Avatar.Image src={user?.profilePicURL} />
                  </Avatar.Root>
                </Button>
              </Dialog.Trigger>
              <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                  <Dialog.Content>
                    <Dialog.Header>
                      <Dialog.Title>Удалить аккаунт ?</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                      <Text>Вы действительно хотите удалить свой профиль?</Text>
                      <Text>Имя: {displayName}</Text>
                      <Text>Email: {user?.email}</Text>
                    </Dialog.Body>
                    <Dialog.Footer>
                      <Dialog.ActionTrigger asChild>
                        <Button variant="outline">Отмена</Button>
                      </Dialog.ActionTrigger>
                      <Button bg="red" onClick={handleDeleteAccount}>
                        Удалить
                      </Button>
                    </Dialog.Footer>
                    <Dialog.CloseTrigger asChild>
                      <CloseButton size="sm" />
                    </Dialog.CloseTrigger>
                  </Dialog.Content>
                </Dialog.Positioner>
              </Portal>
            </Dialog.Root>
            <Text
              display={{ base: "inline-block", md: "none" }}
              _hover={{ cursor: "pointer", textDecoration: "underline" }}
              border="1px solid"
              borderColor="gray.200"
              borderRadius="md"
              padding={2}
              onClick={handleLogout}
            >
              <ImExit />
              Выйти
            </Text>
          </Flex>
        ) : (
          <Link href="/auth" passHref>
            <Text
              display={{ base: "inline-block", md: "none" }}
              _hover={{ cursor: "pointer", textDecoration: "underline" }}
              border="1px solid"
              borderColor="gray.200"
              borderRadius="md"
              padding={2}
            >
              <ImEnter />
              Войти
            </Text>
          </Link>
        )}
      </Stack>
      <Stack display={{ base: "none", md: "flex" }}>
        {authUser ? (
          <Flex align="center">
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button variant="plain" size="sm">
                  <Avatar.Root mx={2}>
                    <Avatar.Fallback name={user?.fullName} />
                    <Avatar.Image src={user?.profilePicURL} />
                  </Avatar.Root>
                </Button>
              </Dialog.Trigger>
              <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                  <Dialog.Content>
                    <Dialog.Header>
                      <Dialog.Title>Удалить аккаунт ?</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                      <Text>Вы действительно хотите удалить свой профиль?</Text>
                      <Text>Имя: {displayName}</Text>
                      <Text>Email: {user?.email}</Text>
                    </Dialog.Body>
                    <Dialog.Footer>
                      <Dialog.ActionTrigger asChild>
                        <Button variant="outline">Отмена</Button>
                      </Dialog.ActionTrigger>
                      <Button bg="red" onClick={handleDeleteAccount}>
                        Удалить
                      </Button>
                    </Dialog.Footer>
                    <Dialog.CloseTrigger asChild>
                      <CloseButton size="sm" />
                    </Dialog.CloseTrigger>
                  </Dialog.Content>
                </Dialog.Positioner>
              </Portal>
            </Dialog.Root>
            <Text
              display={{ base: "inline-block", md: "block" }}
              _hover={{ cursor: "pointer", textDecoration: "underline" }}
              border="1px solid"
              borderColor="gray.200"
              borderRadius="md"
              padding={2}
              onClick={handleLogout}
            >
              <ImExit />
              Выйти
            </Text>
          </Flex>
        ) : (
          <Link href="/auth" passHref>
            <Text
              display={{ base: "inline-block", md: "block" }}
              _hover={{ cursor: "pointer", textDecoration: "underline" }}
              border="1px solid"
              borderColor="gray.200"
              borderRadius="md"
              padding={2}
            >
              <ImEnter />
              Войти
            </Text>
          </Link>
        )}
      </Stack>
    </Flex>
  );
};

export default Header;
