import dynamic from "next/dynamic";

const DynamicMyNotes = dynamic(() => import("./MyNotes"), {
  ssr: false,
});

export default DynamicMyNotes;
