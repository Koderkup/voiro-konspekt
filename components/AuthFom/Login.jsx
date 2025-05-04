'use client';
import { useState } from "react";
import { Input, Button, Alert, AlertIcon } from "@chakra-ui/react";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const { loading, error, login } = useLogin();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
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
        placeholder="Password"
        type="password"
        name="password"
        size={"sm"}
        fontSize={14}
        value={inputs.password}
        onChange={handleChange}
      />
      {error && (
        <Alert status="error" fontSize={13} p={2} borderRadius={4}>
          <AlertIcon fontSize={12} />
          {error.message}
        </Alert>
      )}
      <Button
        w={"full"}
        colorScheme="blue"
        size={"sm"}
        fontSize={14}
        onClick={() => login(inputs)}
        isLoading={loading}
      >
        Log in
      </Button>
    </>
  );
};

export default Login;
