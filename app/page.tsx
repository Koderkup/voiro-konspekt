"use client";
import {
  Box,
  Flex,
  Text,
  Button,
} from "@chakra-ui/react";
import Image from "next/image";
import { Image as ChakraImage } from "@chakra-ui/react";
import { toaster } from "../components/ui/toaster";
import { IoBookOutline } from "react-icons/io5";
import Link from "next/link";
import { Tooltip } from "../components/ui/tooltip";
import { FaInstagram } from "react-icons/fa";
import { TbHandFingerRight } from "react-icons/tb";
import useAuthStore from "../store/authStore";
import { useRouter } from "next/navigation";

export default function Home() {
const user = useAuthStore((state) => state.user); 
const router = useRouter();

const handleDownloadClick = (type = "error") => {
  if (!user) {
    toaster.create({
      title: ' Пожалуйста авторизуйтесь, чтобы загрузить тетрадь',
      type: type,
    });
  } else {
   router.push("/study-page");
  }
};

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
            <Tooltip
              content={
                "Скачайте приложение на своё устройство, и конспект будет всегда под рукой"
              }
              openDelay={100}
              closeDelay={500}
              contentProps={{ css: { "--tooltip-bg": "tomato" } }}
            >
              <Box
                display="inline-block"
                padding="10px"
                border="1px solid silver"
                boxShadow="0 8px 30px rgba(0, 0, 0, 0.3)"
                borderRadius="md"
                transition="transform 0.3s"
                _hover={{ transform: "scale(1.1)", cursor: "pointer" }}
              >
                <Text textAlign="center" fontSize="30px">
                  ВОИРО Конспект
                </Text>
              </Box>
            </Tooltip>
            <Box padding={4}>
              <Text
                textAlign="center"
                fontSize={{ base: "20px", md: "30px" }}
                lineHeight={{ base: "30px", md: "52px" }}
              >
                <span style={{ color: "#667394", fontWeight: "400" }}>
                  Наша цель ускорить освоении материала
                  <br />
                </span>
                <span style={{ fontWeight: "700" }}>Учебной программы</span>
                <span style={{ color: "#667394", fontWeight: "400" }}>
                  , надемся что для Вас это будет полезно и удобно. <br />
                  Ознакомится с учебными программами и расписанием Вы сможете на
                  официальном сайте института{"  "}
                </span>
                <Link href={"https://voiro.by/"} passHref legacyBehavior>
                  <Text
                    as="span"
                    color="#4A3AFF"
                    fontWeight="400"
                    textDecoration="underline"
                    _hover={{ cursor: "pointer" }}
                  >
                    ВОИРО
                  </Text>
                </Link>
                <span
                  style={{
                    color: "#667394",
                    fontWeight: "400",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  или подписывайтесь на нас в инстаграме {"  "}
                  <TbHandFingerRight
                    style={{
                      fontSize: "3.6rem",
                    }}
                  />
                  <FaInstagram
                    onClick={() =>
                      window.open(
                        "https://www.instagram.com/center.voiro/",
                        "_blank"
                      )
                    }
                    style={{
                      color: "#E4405F",
                      cursor: "pointer",
                      marginLeft: "5px",
                      fontSize: "3.6rem",
                    }}
                  />
                </span>
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
          onClick={()=>handleDownloadClick()}
        >
          Загрузить тетрадь
          <IoBookOutline />
        </Button>
      </Flex>
    </Box>
  );
}
