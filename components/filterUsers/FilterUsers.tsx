import React from "react";
import { Flex } from "@chakra-ui/react";
import { Input, InputGroup, Button } from "@chakra-ui/react";
import { LuUser, LuCalendar } from "react-icons/lu";
import { RiArrowRightLine } from "react-icons/ri";

const FilterUsers = () => {
  return (
    <Flex my={6} gap={4} wrap={"wrap"} alignItems={'center'} justifyContent={'center'}>
      <InputGroup startElement={<LuUser />} maxW={"40%"}>
        <Input placeholder="Фамилия" />
      </InputGroup>
      <InputGroup startElement={<LuCalendar />} maxW={"40%"}>
        <Input type="date" placeholder="Выберите дату" />
      </InputGroup>
      <Button colorPalette="teal" variant="outline">
        Искать <RiArrowRightLine />
      </Button>
    </Flex>
  );
};

export default FilterUsers;
