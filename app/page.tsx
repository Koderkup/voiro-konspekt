import {
  Box,
  Flex,
  Text,
  VStack,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import Image from "next/image";
import { Image as ChakraImage } from "@chakra-ui/react";
import { IoBookOutline } from "react-icons/io5";

export default function Home() {
  return (
    <Box flexGrow={1}>
      <Flex direction="column" align="center" gap={10} p={4} data-layer="40px">
        <Flex direction="column" align="center" gap={7} data-layer="28px">
          <Flex
            align="center"
            justify="center"
            gap={4}
            width="100%"
            maxWidth="486.88px"
            data-layer="Logo"
            wrap="wrap"
          >
            {Array.from({ length: 8 }).map((_, index) => (
              <Box
                key={index}
                width="17.99px"
                height="17.99px"
                background={
                  [
                    "#1E7F9B",
                    "#2596C2",
                    "#4DA7C2",
                    "#6FC1D3",
                    "#A1D7E5",
                    "#B2E0E7",
                    "#C0E8EB",
                    "#D0F0F3",
                  ][index]
                }
              />
            ))}
          </Flex>
          <Flex direction="column" align="center" data-layer="14px">
            <Text
              textAlign="center"
              color="#667394"
              fontSize={{ base: "28px", md: "50px" }}
              fontWeight="800"
            >
              Спасибо, что пользуетесь нашим приложением!
            </Text>
            <Box
              display="inline-block"
              padding="10px"
              border="1px solid transparent"
              boxShadow="0 8px 30px rgba(0, 0, 0, 0.3)"
              borderRadius="md"
            >
              <Text textAlign="center" fontSize="30px">
                ВОИРО Конспект
              </Text>
            </Box>
            <Box padding={4}>
              <Text
                textAlign="center"
                fontSize={{ base: "20px", md: "30px" }} 
                lineHeight={{ base: "30px", md: "52px" }}               >
                <span style={{ color: "#667394", fontWeight: "400" }}>
                  Thanks for downloading our
                </span>
                <span style={{ color: "#0D0A2C", fontWeight: "700" }}>
                  Brand Book Kit
                </span>
                <span style={{ color: "#667394", fontWeight: "400" }}>
                  , we hope it is useful for you. <br />
                  If you are looking for more amazing free Figma Templates, we
                  recommend you to follow us in the
                </span>
                <span
                  style={{
                    color: "#4A3AFF",
                    fontWeight: "400",
                    textDecoration: "underline",
                  }}
                >
                  Figma Community
                </span>
                <span style={{ color: "#667394", fontWeight: "400" }}>
                  , or get one of our premium website templates from
                </span>
                <span
                  style={{
                    color: "#4A3AFF",
                    fontWeight: "400",
                    textDecoration: "underline",
                  }}
                >
                  BRIXTemplates.com
                </span>
                <span style={{ color: "#667394", fontWeight: "400" }}>.</span>
              </Text>
            </Box>
          </Flex>
        </Flex>
        <ChakraImage src="./images/konspekt.png" alt="konspekt" />
        <Button
          paddingX={15}
          paddingY={10}
          background="#4DA7C2"
          boxShadow="0px 4.63px 18.5px rgba(74, 58, 255, 0.28)"
          borderRadius="86.35px"
          color="white"
          fontSize="25.85px"
          fontWeight="700"
          lineHeight="29.72px"
        >
          Загрузить тетрадь
          <IoBookOutline />
        </Button>
      </Flex>
    </Box>
  );
}
