import { Box, HStack, IconButton, Text, Tooltip } from "native-base";
import { IoCloseSharp } from "react-icons/io5";

type docsType = {
  id: string;
  type: string;
  documentUrl: string;
  showButton: boolean;
  handleDelete: Function;
  setImage: null | Function;
};

export function Card({
  id,
  type,
  documentUrl,
  showButton,
  handleDelete,
  setImage,
}: docsType) {
  return (
    <HStack
      alignItems={"flex-start"}
      justifyContent="space-between"
      mt="10"
      borderColor="white"
      borderWidth={"2"}
      w={["100%", "48%"]}
      minH="30vh"
      py="6"
      p={["3", "2"]}
      mr="5"
      borderRadius={9}
    >
      <HStack flexDir={["column", "row"]}>
        <Box
          mb="3"
          alignSelf={"flex-start"}
          borderWidth="2"
          borderColor={"cyan.300"}
          px="4"
          py="2"
          mr="3"
          borderRadius={8}
        >
          <Text
            textTransform={"capitalize"}
            color="white"
            fontSize={["sm¸", "xl"]}
          >
            {type}
          </Text>
        </Box>
        {documentUrl !== "" && showButton ? (
          <img
            className="doc-img"
            key={documentUrl}
            src={documentUrl}
            alt={type}
          />
        ) : (
          <Box>
            {setImage && (
              <IconButton
                position={"absolute"}
                top="2"
                right="2"
                p="0"
                mt="1.5"
                ml="3"
                onPress={() => setImage(id)}
                icon={<IoCloseSharp style={{ color: "#000" }} size="30" />}
              />
            )}
            <img
              className="doc-img"
              key={documentUrl}
              src={documentUrl}
              alt={type}
            />
          </Box>
        )}
      </HStack>
      {showButton && (
        <IconButton
          position={"absolute"}
          top="2"
          right="2"
          p="0"
          mt="1.5"
          ml="3"
          onPress={() => handleDelete(id)}
          icon={<IoCloseSharp style={{ color: "#fff" }} size="30" />}
        />
      )}
    </HStack>
  );
}
