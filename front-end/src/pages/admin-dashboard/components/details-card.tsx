import { Box, Center, HStack, Switch, Text, VStack } from "native-base";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { ConfirmAction } from "../../../components";
import "../../../styles/style.css";
import { toastSuccess } from "../../../utils/toastMessage";

export const DetailsCard = ({ item }: { item: any }) => {
  const truncateString = (address: string) => {
    const prefix = address.substring(0, 4).concat("...");
    const postfix = address.substring(address.length - 4);
    return prefix + postfix;
  };
  const [toggle, setToggle] = useState(false);
  const [isConfirmed, setConfirmed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const statusColor = (status: string) => {
    if (status === "active") {
      return "green.400";
    } else if (status === "inactive") {
      return "red.400";
    }
  };
  function filterData(id: string) {}
  return (
    item && (
      <HStack
        width={["300vw", "100%"]}
        bgColor={"white"}
        padding={8}
        mb={[8, 3]}>
        <Box
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
          paddingLeft={2}
          width={"1/5"}>
          <Text fontWeight={"light"} fontSize={"lg"}>
            {item.bank_name}
          </Text>
        </Box>
        <Box
          display={"flex"}
          justifyContent="center"
          paddingLeft={4}
          width={"1/5"}>
          <Box
            bgColor={toggle ? statusColor("active") : statusColor("inactive")}
            maxW={"80%"}
            borderRadius="8px">
            <Text
              textAlign={"center"}
              padding={1}
              textTransform="uppercase"
              color="white"
              fontWeight={"semibold"}>
              {toggle ? "active" : "inactive"}
            </Text>
          </Box>
        </Box>
        <Box
          cursor={"pointer"}
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
          width={"1/5"}>
          <CopyToClipboard
            text={item.address}
            onCopy={() => toastSuccess("Address copied successfully")}>
            <Text fontWeight={"light"} fontSize={"xl"}>
              {truncateString(item.address)}
            </Text>
          </CopyToClipboard>
        </Box>
        <VStack alignItems={"center"} justifyContent="center" width={"1/5"}>
          <Switch
            size={"lg"}
            onToggle={() => setToggle((curr) => !curr)}
            isChecked={toggle}
            offTrackColor="orange.100"
            onTrackColor="orange.200"
            onThumbColor="orange.500"
            offThumbColor="orange.50"
          />
        </VStack>
        <Center width="1/5">
          <HStack space={8}>
            <>
              <button onClick={() => setModalVisible(true)}>
                <RiDeleteBinLine size={18} cursor="pointer" color="red" />
              </button>
              <button>
                <AiFillEdit size={18} cursor="pointer" color="green" />
              </button>
            </>
          </HStack>
        </Center>
        <ConfirmAction
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setApproval={(id: string) => filterData(id)}
          heading="Test"
        />
      </HStack>
    )
  );
};
