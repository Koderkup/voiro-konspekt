import React, { FC } from "react";
import { Flex, Input, InputGroup, Button } from "@chakra-ui/react";
import { LuUser, LuCalendar } from "react-icons/lu";
import { RiArrowRightLine } from "react-icons/ri";

interface FilterUsersProps {
  surnameFilter: string;
  setSurnameFilter: (value: string) => void;
  dateFilter: string;
  setDateFilter: (value: string) => void;
  onFilter: () => void;
}

const FilterUsers: FC<FilterUsersProps> = ({
  surnameFilter,
  setSurnameFilter,
  dateFilter,
  setDateFilter,
  onFilter,
}) => {
  return (
    <Flex
      my={6}
      gap={4}
      wrap={"wrap"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <InputGroup startElement={<LuUser />} maxW={"40%"}>
        <Input
          placeholder="Фамилия"
          value={surnameFilter}
          onChange={(e) => setSurnameFilter(e.target.value)}
        />
      </InputGroup>
      <InputGroup startElement={<LuCalendar />} maxW={"40%"}>
        <Input
          type="date"
          placeholder="Выберите дату"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </InputGroup>
      <Button colorScheme="teal" variant="outline" onClick={onFilter}>
        Искать <RiArrowRightLine />
      </Button>
    </Flex>
  );
};

export default FilterUsers;
