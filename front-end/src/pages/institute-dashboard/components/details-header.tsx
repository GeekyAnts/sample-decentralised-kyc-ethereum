import { Box, Center, HStack, Text, VStack } from "native-base";

export const DetailsHeader = () => {
  return (
    <HStack width={["300vw", "100%"]} bgColor={"transperant"} padding={5}>
      <Box textAlign={"center"} width={"1/6"}>
        <Text fontWeight={"light"} color={"white"} fontSize={"lg"}>
          Name
        </Text>
      </Box>
      <Box textAlign={"center"} width={["1/6"]}>
        <Text fontWeight={"light"} color={"white"} fontSize={"lg"}>
          Data Hash
        </Text>
      </Box>
      <Box textAlign={"center"} width={"1/6"}>
        <Text fontWeight={"light"} color={"white"} fontSize={"lg"}>
          Status
        </Text>
      </Box>
      <VStack textAlign={"center"} width={"1/6"}>
        <Text fontWeight={"light"} color={"white"} fontSize={"lg"}>
          Notes
        </Text>
      </VStack>
      <Box textAlign={"center"} width="1/6">
        <Text fontWeight={"light"} color={"white"} fontSize={"lg"}>
          Address
        </Text>
      </Box>

      <Text
        width="1/6"
        textAlign={"right"}
        fontWeight={"light"}
        color={"white"}
        fontSize={"lg"}
        mr="4"
      >
        Actions
      </Text>
    </HStack>
  );
};
