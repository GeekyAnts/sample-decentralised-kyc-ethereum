import { Box, Center, HStack, Text, VStack } from "native-base";

export const DetailsHeader = () => {
  return (
    <HStack width={["300vw", "100%"]} bgColor={"transperant"} padding={5}>
      <Box textAlign="center" width={"1/6"}>
        <Text fontWeight={"light"} color={"white"} fontSize={"lg"}>
          Name
        </Text>
      </Box>
      <Box textAlign="center" width={"1/6"}>
        <Text fontWeight={"light"} color={"white"} fontSize={"lg"}>
          Kyc Status
        </Text>
      </Box>
      <Box textAlign="center" width={"1/6"}>
        <Text fontWeight={"light"} color={"white"} fontSize={"lg"}>
          Data permission
        </Text>
      </Box>
      <VStack width={"1/6"} textAlign="center">
        <Text fontWeight={"light"} color={"white"} fontSize={"lg"}>
          Notes
        </Text>
      </VStack>
      <Box display={"flex"} textAlign="center" width={"1/6"}>
        <Text fontWeight={"light"} color={"white"} fontSize={"lg"}>
          Address
        </Text>
      </Box>

      <Box width={"1/6"} textAlign="center">
        <Text fontWeight={"light"} color={"white"} fontSize={"lg"}>
          Action
        </Text>
      </Box>
    </HStack>
  );
};
