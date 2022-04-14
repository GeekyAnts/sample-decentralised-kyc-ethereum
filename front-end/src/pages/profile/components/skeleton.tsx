import { Box, Center, HStack, Skeleton, VStack } from "native-base";

export const DocumentSkeleton = () => {
  return (
    <Box w={["100%", "50%"]}>
      <HStack
        w={["100%", "90%"]}
        minH="30vh"
        borderWidth="1"
        space={8}
        rounded="md"
        borderColor="white"
        p="4">
        {/* <Skeleton width={"20%"} /> */}
        <Skeleton color={"coolGray.500"} h="100%" width={"100%"} rounded="md" />
      </HStack>
    </Box>
  );
};
