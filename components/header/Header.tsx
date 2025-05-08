"use client";
import React, { useState } from "react";
import { Box, Stack, Heading, Flex, Text, Button } from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { ColorModeButton } from "@/components/ui/color-mode";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg="teal.500"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing="tighter">
          My Application
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
        <Text _hover={{ cursor: "pointer" }}>Home</Text>
        <Text _hover={{ cursor: "pointer" }}>About</Text>
        <Text _hover={{ cursor: "pointer" }}>Services</Text>
        <Text _hover={{ cursor: "pointer" }}>Contact</Text>
      </Stack>
      <Button variant="outline" onClick={onToggle}>
        Toggle Menu
      </Button>
      <ColorModeButton />
    </Flex>
  );
};

export default Header;
