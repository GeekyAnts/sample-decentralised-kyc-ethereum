import { Box, Center, HStack, Pressable, Text, VStack } from "native-base";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import {
  AiFillCheckCircle,
  AiFillInfoCircle,
  AiOutlineRedo,
} from "react-icons/ai";
import { BsArrowClockwise, BsCheck2All } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ConfirmAction } from "../../../components";
import { epochToDate } from "../../../utils/epochToDate";
import { toastSuccess } from "../../../utils/toastMessage";
import "../../../styles/style.css";
export const DetailsCard = ({ item }: { item: any }) => {
  const truncateString = (address: string) => {
    const prefix = address.substring(0, 4).concat("...");
    const postfix = address.substring(address.length - 4);
    return prefix + postfix;
  };
  const [modalVisible, setModalVisible] = useState(false);
  let navigate = useNavigate();

  const statusColor = (status: string) => {
    if (status === "pending") {
      return "orange.400";
    } else if (status === "approved") {
      return "green.400";
    } else if (status === "rejected") {
      return "red.400";
    }
  };

  return (
    item && (
      <HStack
        width={["300vw", "100%"]}
        bgColor={"white"}
        padding={8}
        mb={[8, 3]}>
        <HStack
          space={2}
          display={"flex"}
          justifyContent="space-between"
          alignItems={"center"}
          paddingLeft={2}
          width={"1/6"}>
          <Text fontWeight={"light"} fontSize={"lg"}>
            {item.bank_name}
          </Text>
          <Pressable onPress={() => navigate(`/${item.address}`)}>
            <AiFillInfoCircle size={20} color="#1e293b" />
          </Pressable>
        </HStack>
        <Box
          cursor={"pointer"}
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
          paddingLeft={2}
          width={"1/6"}>
          <CopyToClipboard
            text={item.address}
            onCopy={() => toastSuccess("Data hash copied successfully")}>
            <Text fontWeight={"light"} fontSize={"xl"}>
              {truncateString(item.address)}
            </Text>
          </CopyToClipboard>
        </Box>
        <Box
          display={"flex"}
          justifyContent="center"
          paddingLeft={4}
          width={"1/6"}>
          <Box
            bgColor={statusColor(item.status)}
            maxW={"80%"}
            borderRadius="8px">
            <Text
              textAlign={"center"}
              padding={1}
              textTransform="uppercase"
              color="white"
              fontWeight={"semibold"}>
              {item.status}
            </Text>
          </Box>
        </Box>
        <HStack
          alignItems={"center"}
          justifyContent="center"
          space={2}
          width={"1/6"}>
          <Text fontWeight={"light"} fontSize={"xl"}>
            {epochToDate(item.date).date}
          </Text>
          <Text fontWeight={"semibold"} color="coolGray.400">
            {epochToDate(item.date).time}
          </Text>
        </HStack>
        <Box
          cursor={"pointer"}
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
          paddingLeft={5}
          width={"1/6"}>
          <CopyToClipboard
            text={item.address}
            onCopy={() => toastSuccess("Address copied successfully")}>
            <Text fontWeight={"light"} fontSize={"xl"}>
              {truncateString(item.address)}
            </Text>
          </CopyToClipboard>
        </Box>

        <Center paddingLeft={5} width="1/6">
          <HStack space={8}>
            {item.status === "pending" && (
              <>
                <button onClick={() => setModalVisible(true)}>
                  <AiFillCheckCircle size={20} cursor="pointer" color="green" />
                </button>
                <button>
                  {" "}
                  <MdCancel size={20} cursor="pointer" color="red" />
                </button>
              </>
            )}
          </HStack>

          {item.status === "approved" && (
            <button
              style={{ marginLeft: "4rem" }}
              onClick={() => setModalVisible(true)}>
              <AiOutlineRedo
                className="card-icon"
                size={20}
                cursor="pointer"
                color="#facc15"
              />
            </button>
          )}
        </Center>
        <ConfirmAction
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setApproval={(id: string) => console.log(id)}
          heading="Test"
        />
      </HStack>
    )
  );
};
