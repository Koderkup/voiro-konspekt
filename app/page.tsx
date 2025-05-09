import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import {Image as ChakraImage} from '@chakra-ui/react'

export default function Home() {
  return (
    <Box flexGrow={1}>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, nemo.
        Mollitia non, delectus eos sapiente minus, accusantium ipsum laborum,
        eius nihil culpa facilis consequuntur? Illum tempora explicabo dicta
        adipisci consequuntur!
      </Text>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, nemo.
        Mollitia non, delectus eos sapiente minus, accusantium ipsum laborum,
        eius nihil culpa facilis consequuntur? Illum tempora explicabo dicta
        adipisci consequuntur!
      </Text>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, nemo.
        Mollitia non, delectus eos sapiente minus, accusantium ipsum laborum,
        eius nihil culpa facilis consequuntur? Illum tempora explicabo dicta
        adipisci consequuntur!
      </Text>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, nemo.
        Mollitia non, delectus eos sapiente minus, accusantium ipsum laborum,
        eius nihil culpa facilis consequuntur? Illum tempora explicabo dicta
        adipisci consequuntur!
      </Text>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, nemo.
        Mollitia non, delectus eos sapiente minus, accusantium ipsum laborum,
        eius nihil culpa facilis consequuntur? Illum tempora explicabo dicta
        adipisci consequuntur!
      </Text>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, nemo.
        Mollitia non, delectus eos sapiente minus, accusantium ipsum laborum,
        eius nihil culpa facilis consequuntur? Illum tempora explicabo dicta
        adipisci consequuntur!
      </Text>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, nemo.
        Mollitia non, delectus eos sapiente minus, accusantium ipsum laborum,
        eius nihil culpa facilis consequuntur? Illum tempora explicabo dicta
        adipisci consequuntur!
      </Text>
      <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
        <VStack align={"stretch"} my={"50px"}>
          <Box textAlign={"center"}>Скачайте приложение.</Box>
          <Flex gap={5} justifyContent={"center"}>
            <ChakraImage
              src="/images/playstore.png"
              h={12}
              w={161}
              fit="contain"
              cursor="pointer"
              alt="Playstore.logo"
            />
            <ChakraImage
              src="/images/microsoft.png"
              h={12}
              w={161}
              alt="Microsoft.logo"
              fit="contain"
              cursor="pointer"
            />
          </Flex>
        </VStack>
      </Flex>
    </Box>
  );
}
