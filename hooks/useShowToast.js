import { useCallback } from "react";
import { useToast } from "@chakra-ui/react";
const useShowToast = () => {
  const toast = useToast();
  const showToast = useCallback(
    (title, description, status) => {
      toast({
        title: title,
        description: description,
        status: status,
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    },
    [toast]
  );
  return showToast;
};

export default useShowToast;
