import {
  Box,
  Center,
  HStack,
  Image,
  Pressable,
  Stack,
  Text,
  VStack,
} from "native-base";
import { AiOutlineClose } from "react-icons/ai";

export const ViewImage = ({
  url,
  type,
  setShowModal,
}: {
  url: string;
  type: string;
  setShowModal: (arg0: boolean) => void;
}) => {
  return (
    <Box
      position="fixed"
      top={"12%"}
      left={["", "10%"]}
      borderWidth={2}
      borderColor={"cyan.300"}
      bgColor={"coolGray.600"}
      width={["100vw", "80vw"]}
      height={["50vh", "80vh"]}
      zIndex={99}>
      <HStack width={"100%"} justifyContent="flex-end">
        <Pressable onPress={() => setShowModal(false)} p={1}>
          <AiOutlineClose
            color="white"
            cursor={"pointer"}
            size={30}
            className="cross-icon"
          />
        </Pressable>
      </HStack>
      <VStack
        space={2}
        justifyContent={"center"}
        alignItems="center"
        zIndex={4}>
        <Text textTransform={"capitalize"} color="white" fontSize={"xl"}>
          {type && type}
        </Text>
        {url && <img className="view-image" src={url} />}
      </VStack>
    </Box>
  );
};
