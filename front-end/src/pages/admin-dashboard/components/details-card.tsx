import {
  Box,
  Center,
  HStack,
  Spinner,
  Switch,
  Text,
  Tooltip,
  VStack,
} from "native-base";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { AiFillEdit } from "react-icons/ai";
import { useApi } from "../../../hooks/useApi";
import { Bank, BankStatus } from "../../../repository";
import "../../../styles/style.css";
import { toastSuccess } from "../../../utils/toastMessage";
import { EditModal } from "./edit-modal";

export const DetailsCard = ({ item }: { item: Bank }) => {
  const truncateString = (address: string) => {
    const prefix = address.substring(0, 4).concat("...");
    const postfix = address.substring(address.length - 4);
    return prefix + postfix;
  };
  const [loading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isUdpdating, setIsUpdating] = useState(false);
  const { toggleBankStatus, updateBankDetails } = useApi();

  const statusColor = (status: string) => {
    if (status === "active") {
      return "green.400";
    } else if (status === "inactive") {
      return "red.400";
    }
  };
  async function handleToggleOp(status: boolean) {
    try {
      setLoading(true);
      await toggleBankStatus(item.id_, !status);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleEditOp(data: {
    name: string;
    email: string;
    id: string;
  }) {
    try {
      setShowEditModal(false);
      setIsUpdating(true);
      await updateBankDetails(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <HStack width={["300vw", "100%"]} bgColor={"white"} padding={8} mb={[8, 3]}>
      <Box
        display={"flex"}
        justifyContent="center"
        alignItems={"center"}
        paddingLeft={2}
        width={"1/5"}
      >
        <Text fontWeight={"light"} fontSize={"lg"}>
          {item.name}
        </Text>
      </Box>
      <Box
        display={"flex"}
        justifyContent="center"
        paddingLeft={4}
        width={"1/5"}
      >
        <Box
          bgColor={
            (item.status === BankStatus.Active ? true : false)
              ? statusColor("active")
              : statusColor("inactive")
          }
          maxW={"80%"}
          borderRadius="8px"
        >
          <Text
            textAlign={"center"}
            padding={1}
            textTransform="uppercase"
            color="white"
            fontWeight={"semibold"}
          >
            {(item.status === BankStatus.Active ? true : false)
              ? "active"
              : "inactive"}
          </Text>
        </Box>
      </Box>
      <Box
        cursor={"pointer"}
        display={"flex"}
        justifyContent="center"
        alignItems={"center"}
        width={"1/5"}
      >
        <CopyToClipboard
          text={item.id_}
          onCopy={() => toastSuccess("Address copied successfully")}
        >
          <Text fontWeight={"light"} fontSize={"xl"}>
            <Tooltip
              maxWidth={"100%"}
              label={"Click to copy"}
              placement={"bottom"}
            >
              {truncateString(item.id_)}
            </Tooltip>
          </Text>
        </CopyToClipboard>
      </Box>
      <VStack alignItems={"center"} justifyContent="center" width={"1/5"}>
        {loading ? (
          <Spinner size="sm" color="warning.700" />
        ) : (
          <Switch
            size={"lg"}
            onToggle={() =>
              handleToggleOp(item.status === BankStatus.Active ? true : false)
            }
            isChecked={item.status === BankStatus.Active ? true : false}
            offTrackColor="orange.100"
            onTrackColor="orange.200"
            onThumbColor="orange.500"
            offThumbColor="orange.50"
          />
        )}
      </VStack>
      <Center width="1/5">
        {isUdpdating ? (
          <Spinner size="sm" color="warning.700" />
        ) : (
          <Tooltip placement="bottom" label="edit details">
            <button
              style={{ marginLeft: ".5rem" }}
              onClick={() => setShowEditModal(true)}
            >
              <AiFillEdit size={18} cursor="pointer" color="green" />
            </button>
          </Tooltip>
        )}
      </Center>
      <EditModal
        data={item}
        setApproval={(data: { name: string; email: string; id: string }) =>
          handleEditOp(data)
        }
        modalVisible={showEditModal}
        setModalVisible={() => setShowEditModal(false)}
      />
    </HStack>
  );
};
