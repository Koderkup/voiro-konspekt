import { useCallback } from "react";
import { toaster } from "../components/ui/toaster";
const useShowToast = () => {
  const showToast = useCallback(
    (title, description, type) => {
      toaster.create({
        title: title,
        description: description,
        type: type,
        duration: 5000,
      });
    },
    [toaster]
  );
  return showToast;
};

export default useShowToast;
