import { Box, Center, HStack, IconButton, Text, VStack } from "native-base";
import { BsArrowClockwise, BsCheck2All } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import { epochToDate } from "../../../utils/epochToDate";
import { truncateString } from "../../../utils/trancare-string";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toastSuccess } from "../../../utils/toastMessage";
import "../../../styles/style.css";
import { useState } from "react";
import { ConfirmAction } from "../../../components";
import { AiFillCheckCircle, AiOutlineRedo } from "react-icons/ai";
import { MdCancel } from "react-icons/md";

export const DetailsCard = ({ item }: { item: any }) => {
  const [modalVisible, setModalVisible] = useState(false);

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
        padding={[8]}
        mb={[8, 4]}>
        <Box
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
          width={"1/5"}>
          <Text fontWeight={"light"} fontSize={"lg"}>
            {item.bank_name}
          </Text>
        </Box>
        <Box
          display={"flex"}
          alignItems="center"
          justifyContent="center"
          width={"1/5"}>
          <Box
            bgColor={statusColor(item.status)}
            width="60%"
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
        <HStack alignItems="center" justifyContent="center" width={"1/5"}>
          <Text fontWeight={"light"} fontSize={"xl"}>
            {epochToDate(item.date).date}
          </Text>
          <Text pl={2} fontWeight={"semibold"} color="coolGray.400">
            {epochToDate(item.date).time}
          </Text>
        </HStack>
        <Box
          cursor={"pointer"}
          width={"1/5"}
          justifyContent="center"
          alignItems={"center"}>
          <CopyToClipboard
            text={item.address}
            onCopy={() => toastSuccess("Address copied successfully")}>
            <Text fontWeight={"light"} fontSize={"xl"}>
              {truncateString(item.address)}
            </Text>
          </CopyToClipboard>
        </Box>

        <HStack width="1/5" justifyContent="center">
          {item.status === "pending" && (
            <HStack space="8">
              <button onClick={() => setModalVisible(true)}>
                <AiFillCheckCircle size={20} cursor="pointer" color="green" />
              </button>
              <button>
                <MdCancel size={20} cursor="pointer" color="red" />
              </button>
            </HStack>
          )}

          {item.status === "approved" && (
            <button
              style={{ marginLeft: "4rem" }}
              onClick={() => setModalVisible(true)}>
              <AiOutlineRedo size={20} cursor="pointer" color="#facc15" />
            </button>
          )}
        </HStack>
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
