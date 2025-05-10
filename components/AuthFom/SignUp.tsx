"use client";
import { useState } from "react";
import { Input, Button, Alert, Box } from "@chakra-ui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";


const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    surname: "",
    email: "",
    password: "",
  });
  const { loading, error, signup } = useSignUpWithEmailAndPassword();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: any) => {
    setInputs((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  return (
    <>
      <Input
        placeholder="Имя Отчество"
        type="text"
        name="fullName"
        size={"sm"}
        fontSize={14}
        value={inputs.fullName}
        onChange={handleChange}
      />
      <Input
        placeholder="Фамилия"
        type="text"
        name="surname"
        size={"sm"}
        fontSize={14}
        value={inputs.surname}
        onChange={handleChange}
      />
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
        type={showPassword ? "text" : "password"}
        name="password"
        size={"sm"}
        fontSize={14}
        value={inputs.password}
        onChange={handleChange}
        pr="2.5rem"
      />
      <Box position={"absolute"} top={"-25px"} right={"-32px"}>
        <Button
          variant={"ghost"}
          size="sm"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FiEye /> : <FiEyeOff />}
        </Button>
      </Box>

      {error && (
        <Alert.Root>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Ошибка</Alert.Title>
            <Alert.Description>{error.message}</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}

      <Button
        w={"full"}
        colorScheme="blue"
        size={"sm"}
        fontSize={14}
        loading={loading}
        onClick={() => {
          signup(inputs);
        }}
      >
        Регистрация
      </Button>
    </>
  );
};

export default SignUp;
