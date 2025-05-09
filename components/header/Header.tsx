"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Box, Stack, Heading, Flex, Text } from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { ColorModeButton } from "@/components/ui/color-mode";
import { ImEnter } from "react-icons/im";
import { Image as ChildImage } from "@chakra-ui/react";
import Link from "next/link"; 
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
const pathname = usePathname();

const onToggle = () => {
  setIsOpen(!isOpen);
};

const isActive = (path: string) => {
  return pathname === path;
};

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg="#2596C2"
      color="white"
      position="relative"
    >
      <Flex
        align="center"
        mr={5}
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
        padding={2}
      >
        {/* <Box mr={3} ml={-2}>
          <ColorModeButton />
        </Box> */}
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
        <Link href="/my-notes" passHref>
          <Text
            _hover={{ cursor: "pointer", textDecoration: "underline" }}
            textDecoration={isActive("/my-notes") ? "underline" : "none"}
          >
            Мои конспекты
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
        <Link href="/auth" passHref>
          <Text
            display={{ base: "inline-block", md: "none" }}
            _hover={{ cursor: "pointer", textDecoration: "underline" }}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            padding={2}
            textDecoration={isActive("/auth") ? "underline" : "none"}
          >
            <ImEnter />
            Войти
          </Text>
        </Link>
      </Stack>
      <Stack display={{ base: "none", md: "flex" }}>
        <Link href="/auth" passHref>
          <Text _hover={{ cursor: "pointer" }}>
            <ImEnter />
            Войти
          </Text>
        </Link>
      </Stack>
    </Flex>
  );
};

export default Header;
