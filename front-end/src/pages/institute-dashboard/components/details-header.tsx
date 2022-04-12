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
          Updated At
        </Text>
      </VStack>
      <Box textAlign={"center"} width="1/6">
        <Text fontWeight={"light"} color={"white"} fontSize={"lg"}>
          Address
        </Text>
      </Box>

      <Center width="1/6" textAlign={"center"}>
        <Text fontWeight={"light"} color={"white"} fontSize={"lg"}>
          Action
        </Text>
      </Center>
    </HStack>
  );
};
