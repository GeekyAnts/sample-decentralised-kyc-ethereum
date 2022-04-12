import { Center, HStack, Text } from "native-base";

export const CaseCount = ({
  count,
  heading,
}: {
  count: number;
  heading: string;
}) => {
  const formatCount = (count: number) => {
    if (count < 100) {
      return `0${count}`;
    }
    return count;
  };

  return (
    <HStack bg={"white"} maxWidth={["400px", "300px"]} mb={[2, ""]}>
      <Center padding={8}>
        <Text fontSize={"3xl"} fontWeight="semibold" color={"yellow.400"}>
          {formatCount(count)}
        </Text>
      </Center>
      <Center paddingRight={10}>
        <Text
          fontSize={"lg"}
          color="coolGray.400"
          fontWeight={"semibold"}
          textTransform={"uppercase"}>
          {heading.split(" ")[0]}
          <br />
          {heading.split(" ")[1]}
        </Text>
      </Center>
    </HStack>
  );
};
