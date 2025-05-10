import { Box, Flex, VStack, Container, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import Image from "next/image";
import { Link } from "@chakra-ui/react";
import { Image as ChildImage } from "@chakra-ui/react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box bg="gray.100" py={8} width="100%">
      <Container maxW="container.xl">
        {/* Desktop Layout */}
        <Flex
          direction="column"
          display={{ base: "none", md: "flex" }}
          align="center"
        >
          <Flex align="center" justify="space-between" width="100%">
            <Flex align="center">
              <ChildImage asChild mr={4}>
                <Image
                  src="/images/icons/icon-192x192.png"
                  alt="VOIRO"
                  height={192}
                  width={192}
                />
              </ChildImage>
            </Flex>

            <VStack direction="row" alignItems="center" gap={4} mx="auto">
              <NextLink href="/" passHref legacyBehavior>
                <Link _hover={{ cursor: "pointer" }} style={{ color: "black" }}>
                  Главная
                </Link>
              </NextLink>
              <NextLink href="/my-notes" passHref legacyBehavior>
                <Link _hover={{ cursor: "pointer" }} style={{ color: "black" }}>
                  Мои конспекты
                </Link>
              </NextLink>
              <NextLink href="/tests" passHref legacyBehavior>
                <Link _hover={{ cursor: "pointer" }} style={{ color: "black" }}>
                  Тесты
                </Link>
              </NextLink>
              <NextLink href="/auth" passHref legacyBehavior>
                <Link _hover={{ cursor: "pointer" }} style={{ color: "black" }}>
                  Авторизация
                </Link>
              </NextLink>
            </VStack>

            <Box
              width="500px"
              height="250px"
              borderRadius="md"
              overflow="hidden"
            >
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3Ad9528df19ca2137521375485ab0639418643f6ce76629393be46f8698b7cbbf1&amp;source=constructor"
                width="100%"
                height="340"
                frameBorder="0"
              ></iframe>
            </Box>
          </Flex>
          <Text textAlign="center" mt={4} fontSize="sm" color="gray.600">
            © {currentYear} ВОИРО. Все права защищены.
          </Text>
        </Flex>

        {/* Mobile Layout */}
        <VStack align="stretch" display={{ base: "flex", md: "none" }} gap={4}>
          <Flex align="center" justify="space-between">
            <ChildImage asChild>
              <Image
                src="/images/icons/icon-128x128.png"
                alt="VOIRO"
                height={128}
                width={128}
              />
            </ChildImage>

            <VStack align="start" gap={2}>
              <NextLink href="/" passHref legacyBehavior>
                <Link _hover={{ cursor: "pointer" }} style={{ color: "black" }}>
                  Главная
                </Link>
              </NextLink>
              <NextLink href="/my-notes" passHref legacyBehavior>
                <Link _hover={{ cursor: "pointer" }} style={{ color: "black" }}>
                  Мои конспекты
                </Link>
              </NextLink>
              <NextLink href="/tests" passHref legacyBehavior>
                <Link _hover={{ cursor: "pointer" }} style={{ color: "black" }}>
                  Тесты
                </Link>
              </NextLink>
              <NextLink href="/auth" passHref legacyBehavior>
                <Link _hover={{ cursor: "pointer" }} style={{ color: "black" }}>
                  Авторизация
                </Link>
              </NextLink>
            </VStack>
          </Flex>

          <Box width="100%" height="200px" borderRadius="md" overflow="hidden">
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3Ad9528df19ca2137521375485ab0639418643f6ce76629393be46f8698b7cbbf1&amp;source=constructor"
              width="100%"
              height="240"
              frameBorder="0"
            ></iframe>
          </Box>

          <Text textAlign="center" fontSize="sm" color="gray.600">
            © {currentYear} ВОИРО. Все права защищены.
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default Footer;
