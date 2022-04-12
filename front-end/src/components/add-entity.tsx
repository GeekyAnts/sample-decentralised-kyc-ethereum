import { Center, HStack, Text } from "native-base";
import { IoMdAddCircle } from "react-icons/io";
import { Pressable } from "react-native";
import { useNavigate } from "react-router-dom";

export const AddEntity = ({
  entity,
  route,
}: {
  entity: string;
  route: string;
}) => {
  const navigate = useNavigate();
  return (
    <Pressable onPress={() => navigate(route)}>
      <HStack bg={"white"} maxWidth={["400px", "300px"]} cursor={"pointer"}>
        <Center padding={8}>
          <IoMdAddCircle size={50} color="#facc15" />
        </Center>
        <Center paddingRight={10}>
          <Text
            fontSize={"lg"}
            color="coolGray.400"
            fontWeight={"semibold"}
            textTransform={"uppercase"}>
            Add
            <br />
            {entity}
          </Text>
        </Center>
      </HStack>
    </Pressable>
  );
};
