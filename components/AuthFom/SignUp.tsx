"use client";
import { useState } from "react";
import { Input, Button, Alert, Box } from "@chakra-ui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";
import useShowToast from "@/hooks/useShowToast";
const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const { loading, error, signup } = useSignUpWithEmailAndPassword();
  const [showPassword, setShowPassword] = useState(false);
  const showToast = useShowToast();
  const handleChange = (e: any) => {
    setInputs((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleShowToast = () => {
    showToast("Success", "File saved successfully", "success");
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

      <Input
        placeholder="Password"
        type={showPassword ? "text" : "password"}
        name="password"
        size={"sm"}
        fontSize={14}
        value={inputs.password}
        onChange={handleChange}
        pr="2.5rem"
      />
      <Box position={"absolute"} top={'-25px'} right={'-32px'}>
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
            <Alert.Title />
            <Alert.Description />
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
