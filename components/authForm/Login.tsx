"use client";
import { useState } from "react";
import { Input, Button, Alert } from "@chakra-ui/react";
import useLogin from "../../hooks/useLogin";
import { useRouter } from "next/navigation";

const Login = () => {
  const { loading, error, login } = useLogin();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [localError, setLocalError] = useState<string | null>(null);
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleLogin = async () => {
    const success = await login(inputs);
    if (success) {
      setLocalError(null);
      router.push("/");
    } else {
      setLocalError("Ошибка авторизации");
    }
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
      {localError && (
        <Alert.Root status="error">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Ошибка</Alert.Title>
            <Alert.Description>{localError}</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}
      <Button
        w={"full"}
        colorScheme="blue"
        size={"sm"}
        fontSize={14}
        onClick={handleLogin}
        loading={!!loading}
      >
        Вход
      </Button>
    </>
  );
};

export default Login;
