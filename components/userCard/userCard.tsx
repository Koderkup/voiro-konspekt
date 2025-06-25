import {
  Avatar,
  Button,
  Card,
  HStack,
  Stack,
  Strong,
  Text,
  Tag,
  Input,
} from "@chakra-ui/react";
import { LuCheck, LuX } from "react-icons/lu";
import { User } from "../../types/user.dto";
import { FcPlus } from "react-icons/fc";
import { useState } from "react";
import { firestore } from "../../firebase/firebase"; 
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
interface UserCardProps {
  user: User;
  onUserDeleted: (userId: string) => Promise<void>;
}
const UserCard: React.FC<UserCardProps> = ({ user, onUserDeleted }) => {
  const { profilePicURL, email, accessibleNotes, fullName, username } = user;
  const [newNote, setNewNote] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false);

  const handleAddNote = async () => {
    if (newNote.trim()) {
      try {
        const userRef = doc(firestore, "users", user.uid);
        await updateDoc(userRef, {
          accessibleNotes: [...accessibleNotes, newNote],
        });

        setNewNote("");
        setIsInputVisible(false);
      } catch (error) {
        console.error("Ошибка при добавлении заметки: ", error);
      }
    }
  };

  return (
    <Card.Root width="320px" h={300}>
      <Card.Body>
        <HStack mb="6" gap="3">
          <Avatar.Root>
            <Avatar.Image
              src={profilePicURL || "https://via.placeholder.com/96"}
            />
            <Avatar.Fallback name={fullName ? fullName.charAt(0) : "A"} />
          </Avatar.Root>
          <Stack gap="0">
            <Text fontWeight="semibold" textStyle="sm">
              {fullName || username}
            </Text>
            <Text color="fg.muted" textStyle="sm">
              {email}
            </Text>
          </Stack>
        </HStack>
        <Card.Description>
          <Strong color="fg">{fullName || username}</Strong>
          {accessibleNotes.length > 0 ? (
            <Stack>
              {accessibleNotes.map((note, index) => (
                <Tag.Root key={index}>
                  <Tag.Label>{note}</Tag.Label>
                </Tag.Root>
              ))}
              <FcPlus
                style={{ width: "30px", height: "30px", cursor: "pointer" }}
                onClick={() => setIsInputVisible(!isInputVisible)}
              />
              {isInputVisible && (
                <HStack mt="2">
                  <Input
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Название конспекта"
                  />
                </HStack>
              )}
            </Stack>
          ) : (
            <>
              <Text color="fg.muted">Конспектов нет </Text>
              <FcPlus
                style={{ width: "30px", height: "30px", cursor: "pointer" }}
                onClick={() => setIsInputVisible(!isInputVisible)}
              />
              {isInputVisible && (
                <HStack mt="2">
                  <Input
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Название конспекта"
                  />
                </HStack>
              )}
            </>
          )}
        </Card.Description>
      </Card.Body>
      <Card.Footer>
        <Button
          variant="subtle"
          colorPalette="red"
          flex="1"
          onClick={() => onUserDeleted(user.uid)}
        >
          <LuX />
          Удалить
        </Button>
        <Button
          variant="subtle"
          colorPalette="blue"
          flex="1"
          onClick={handleAddNote}
        >
          <LuCheck />
          Сохранить
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default UserCard;
