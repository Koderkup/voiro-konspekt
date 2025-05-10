'use client';
import { useState } from "react";
import { Input, Button, Alert } from "@chakra-ui/react";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const { loading, error, login } = useLogin();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <>
      <Input
        placeholder="Email"
        type="email"
        name="email"
        size={"sm"}
        fontSize={14}
        value={inputs.email}
        onChange={handleChange}
      />
      <Input
        placeholder="Пароль"
        type="password"
        name="password"
        size={"sm"}
        fontSize={14}
        value={inputs.password}
        onChange={handleChange}
      />
      {error && (
        <Alert.Root>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Ошибка</Alert.Title>
            <Alert.Description>{"Ошибка авторизации"}</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}
      <Button
        w={"full"}
        colorScheme="blue"
        size={"sm"}
        fontSize={14}
        onClick={() => login(inputs)}
        loading={!!loading}
      >
        Вход
      </Button>
    </>
  );
};

export default Login;
