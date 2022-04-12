import { HStack, Icon, Pressable, Text } from "native-base";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export function ScreenHeader({ text, route }: { route: any; text: string }) {
  const navigate = useNavigate();
  return (
    <HStack alignItems={"center"} mb="4">
      <Pressable onPress={() => navigate(route)}>
        <Icon as={<IoArrowBackSharp size={20} className="icon" />} />
      </Pressable>
      <Text
        color="black"
        textTransform={"capitalize"}
        fontWeight={"lg"}
        ml="2"
        fontSize="xl">
        {text}
      </Text>
    </HStack>
  );
}
