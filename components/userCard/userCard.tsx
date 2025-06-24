import {
  Avatar,
  Button,
  Card,
  HStack,
  Stack,
  Strong,
  Text,
  Tag,
} from "@chakra-ui/react";
import { LuCheck, LuX } from "react-icons/lu";
import { User } from "../../types/user.dto";

interface UserCardProps {
  user: User;
}
const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const { profilePicURL, email, accessibleNotes, fullName, username } = user;

  return (
    <Card.Root width="320px">
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
                  <Tag.Label>note</Tag.Label>
                </Tag.Root>
              ))}
            </Stack>
          ) : (
            <Text color="fg.muted">Конспектов нет</Text>
          )}
        </Card.Description>
      </Card.Body>
      <Card.Footer>
        <Button variant="subtle" colorPalette="red" flex="1">
          <LuX />
          Decline
        </Button>
        <Button variant="subtle" colorPalette="blue" flex="1">
          <LuCheck />
          Approve
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default UserCard;
