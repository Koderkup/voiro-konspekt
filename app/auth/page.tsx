"use client";
import { Container, Flex, Box, Image, VStack } from "@chakra-ui/react";
import AuthForm from '../../components/authForm/AuthForm'

const AuthPage = () => {
  return (
    <>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        px={4}
        mt={10}
      >
        <Container maxW={"container.md"} padding={0}>
          <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
            <VStack gap={4} align={"stretch"}>
              <AuthForm />
              <Box textAlign={"center"}>Скачайте приложение.</Box>
              <Flex gap={5} justifyContent={"center"} mb={10}>
                <Image
                  src="/images/playstore.png"
                  h={"10"}
                  alt="Playstore logo"
                />
                <Image
                  src="/images/microsoft.png"
                  h={"10"}
                  alt="Microsoft logo"
                />
              </Flex>
            </VStack>
          </Flex>
        </Container>
      </Flex>
    </>
  );
};

export default AuthPage;
