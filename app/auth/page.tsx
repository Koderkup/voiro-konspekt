
import { ColorModeButton } from "@/components/ui/color-mode";
import { Container, Flex, Box, Image, VStack } from "@chakra-ui/react";
import { Card } from "@chakra-ui/react";
const AuthPage = () => {
  return (
    <Flex maxH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
      <ColorModeButton />
      <Container maxW={"container.md"}>
        <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
          <Box display={{ base: "none", md: "block" }}>
            <Image src="/images/auth.png" h={650} alt="Phone image" />
          </Box>
          <VStack align={"stretch"} my={"50px"}>
            <Box textAlign={"center"}>Get the App.</Box>
            <Flex gap={5} justifyContent={"center"}>
              <Image src="/images/playstore.png" h={10} alt="Playstore.logo" />
              <Image src="/images/microsoft.png" h={10} alt="Microsoft.logo" />
            </Flex>
          </VStack>
        </Flex>
      </Container>
    </Flex>
  );
};

export default AuthPage;
