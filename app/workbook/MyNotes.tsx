import PdfEditor from "@/components/PdfEditor/PdfEditor";
import { Box } from "@chakra-ui/react";

const MyNotes = () => {
  return (
    <Box minHeight="100vh" position="relative">
      <PdfEditor />
    </Box>
  );
};

export default MyNotes;
