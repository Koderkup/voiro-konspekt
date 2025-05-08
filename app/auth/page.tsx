
import { Container, Flex, Box, Image, VStack } from "@chakra-ui/react";
import {
  Button,
  Field,
  Fieldset,
  For,
  Input,
  NativeSelect,
  Stack,
} from "@chakra-ui/react";
const AuthPage = () => {
  return (
    <Flex maxH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
      <Container maxW={"container.md"}>
        <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
          <VStack align={"stretch"} my={"50px"}>
            <Box textAlign={"center"}>Скачайте приложение.</Box>
            <Flex gap={5} justifyContent={"center"}>
              <Image
                src="/images/playstore.png"
                h={12}
                w={161}
                fit="contain"
                cursor="pointer"
                alt="Playstore.logo"
              />
              <Image
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
        <Fieldset.Root size="lg" maxW="md">
          <Stack>
            <Fieldset.Legend>Contact details</Fieldset.Legend>
            <Fieldset.HelperText>
              Please provide your contact details below.
            </Fieldset.HelperText>
          </Stack>

          <Fieldset.Content>
            <Field.Root>
              <Field.Label>Name</Field.Label>
              <Input name="name" />
            </Field.Root>

            <Field.Root>
              <Field.Label>Email address</Field.Label>
              <Input name="email" type="email" />
            </Field.Root>

            <Field.Root>
              <Field.Label>Country</Field.Label>
              <NativeSelect.Root>
                <NativeSelect.Field name="country">
                  <For each={["United Kingdom", "Canada", "United States"]}>
                    {(item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    )}
                  </For>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Field.Root>
          </Fieldset.Content>

          <Button type="submit" alignSelf="flex-start">
            Submit
          </Button>
        </Fieldset.Root>
      </Container>
    </Flex>
  );
};

export default AuthPage;
