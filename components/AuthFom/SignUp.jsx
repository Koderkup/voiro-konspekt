'use client';
import { useState } from "react";
import { Input, Button, InputGroup, Alert, AlertIcon } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, InputRightElement } from "@chakra-ui/icons";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";
const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const { loading, error, signup } = useSignUpWithEmailAndPassword();
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <>
      <Input
        placeholder="Full Name"
        type="text"
        name="fullName"
        size={"sm"}
        fontSize={14}
        value={inputs.fullName}
        onChange={handleChange}
      />
      <Input
        placeholder="Username"
        type="text"
        name="username"
        size={"sm"}
        fontSize={14}
        value={inputs.username}
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
      <InputGroup>
        <Input
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          size={"sm"}
          fontSize={14}
          value={inputs.password}
          onChange={handleChange}
        />
        <InputRightElement h={"full"}>
          <Button
            variant={"ghost"}
            size="sm"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
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
        isLoading={loading}
        onClick={() => {
          signup(inputs);
        }}
      >
        Sign Up
      </Button>
    </>
  );
};

export default SignUp;
 