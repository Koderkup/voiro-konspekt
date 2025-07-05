"use client";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading/Loading";
import useAuthStore from "../../store/authStore";
import { Box, Heading, Flex, Kbd, Text } from "@chakra-ui/react";
import Link from "next/link";

const StudyPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const user = useAuthStore((state) => state.user);
  const [workbooks, setWorkbooks] = useState<string[] | null>(null);
  useEffect(() => {
    setIsMounted(true);
    if (user) setWorkbooks(user.accessibleNotes);
  }, []);
useEffect(() => {
  async function fetchNotebooks() {
    try {
      const res = await fetch("/api/notebooks");
      const notebooks = await res.json();
      console.log("📓 Список тетрадей:", notebooks);
    } catch (err) {
      console.error("Ошибка загрузки:", err);
    }
  }

  fetchNotebooks();
}, []);
  if (!isMounted) return <Loading />;
  return (
    <>
      <Flex alignItems="center" justifyContent="center">
        <Box display="flex" alignItems="center" justifyContent="center" my={4}>
          <Box width="4px" height="50px" bg="blue.500" mr={4} />
          <Heading textAlign="center" w={"fit-content"}>
            Доступные Вам конспекты здесь. Переходите по ссылке, чтобы открыть.
          </Heading>
        </Box>
      </Flex>
      <Flex
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {workbooks && workbooks.length > 0 ? (
          workbooks.map((wb, i) => (
            <Link href="/workbook" key={i}>
              <Kbd>{wb}</Kbd>
            </Link>
          ))
        ) : (
          <Text>Доступных конспектов нет</Text>
        )}
      </Flex>
    </>
  );
};

export default StudyPage;
