import { Box, Center, HStack, Text, VStack } from "native-base";

export const DetailsHeader = () => {
  return (
    <HStack width={["300vw", "100%"]} bgColor={"transperant"} padding={5}>
      <Box textAlign={"center"} width={"1/5"}>
        <Text fontWeight={"light"} color={"white"} fontSize={"lg"}>
          Name
        </Text>
      </Box>
      <Box textAlign={"center"} width={"1/5"}>
        <Text fontWeight={"light"} color={"white"} fontSize={"lg"}>
          Status
        </Text>
      </Box>
      <Box textAlign={"center"} width={"1/5"}>
        <Text fontWeight={"light"} color={"white"} fontSize={"lg"}>
          Address
        </Text>
      </Box>
      <Box textAlign={"center"} width={"1/5"}>
        <Text fontWeight={"light"} color={"white"} fontSize={"lg"}>
          Toggle
        </Text>
      </Box>

      <Text
        textAlign={"center"}
        width={"1/5"}
        fontWeight={"light"}
        color={"white"}
        fontSize={"lg"}
      >
        Action
      </Text>
    </HStack>
  );
};
