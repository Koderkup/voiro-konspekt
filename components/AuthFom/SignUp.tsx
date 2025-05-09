"use client";
import { useState } from "react";
import {
  Input,
  Button,
  InputGroup,
  Alert,
  Box,
  AlertDescription, // Import AlertDescription
} from "@chakra-ui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
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

  const handleChange = (e: any) => {
    setInputs((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
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
          pr="2.5rem" // Added padding right to prevent text overlap
        />
        <Box position="absolute" right="0" top="0" h="full">
          <Button
            variant={"ghost"}
            size="sm"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </Button>
        </Box>


      {error && (
        <Alert status="error" fontSize={13} p={2} borderRadius={4}>
          <AlertIcon />
          <AlertDescription>{error.message}</AlertDescription>{" "}
          {/* Use AlertDescription */}
        </Alert>
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
        Sign Up
      </Button>
    </>
  );
};

export default SignUp;
