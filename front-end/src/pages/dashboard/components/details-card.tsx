import { Box, HStack, Spinner, Text, Tooltip } from "native-base";

import { truncateString } from "../../../utils/trancare-string";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toastError, toastSuccess } from "../../../utils/toastMessage";
import "../../../styles/style.css";
import { useState } from "react";
import { ConfirmAction } from "./confirm-action";
import { AiFillCheckCircle, AiOutlineRedo } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { KycRequest, KycServices } from "../../../repository";
import { useNavigate } from "react-router-dom";
import { GrView } from "react-icons/gr";
import { useApi } from "../../../hooks/useApi";

export const DetailsCard = ({ item }: { item: KycRequest }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [approvalFlag, setApprovalFlag] = useState<boolean | undefined>(
    undefined
  );
  const { actionOnKycRequest, removerDatahashPermission, getBankKycRequests } =
    useApi();

  const [loader, setLoader] = useState<boolean>(false);
  const navigate = useNavigate();
  console.log(loader);

  const kycAction = async (notes: string) => {
    setLoader(true);
    if (approvalFlag !== undefined) {
      await actionOnKycRequest(item.bankId_, approvalFlag, notes);
    } else {
      if ((item.dataRequest === 1 && item.status === 0) || item.status === 1)
        await removerDatahashPermission(item.bankId_, notes);
    }

    setLoader(false);
  };

  const dataHashCheck = () => {
    if (item.dataHash.length === 0) {
      toastError(
        "No documents available, atleast one document needed for action"
      );
    } else {
      setModalVisible(true);
    }
  };
  const status = (status: number) => {
    if (status === 0) {
      return "orange.400";
    } else if (status === 1) {
      return "green.400";
    } else if (status === 2) {
      return "red.400";
    }
  };

  const modalMessage = () => {
    if (item.dataRequest === 0 || item.dataRequest === 2) {
      if (approvalFlag === true) {
        return "You are about to share details with the bank. Would you like to any additional notes?";
      } else if (approvalFlag === false) {
        return "You are about to reject permission for details asked by the bank. Would you like to any additional notes?";
      }
    } else if (
      (item.status === 0 || item.status === 1) &&
      item.dataRequest === 1
    ) {
      return "You are about to revoke data access given to the bank. Would you like to add additional notes?";
    }
  };

  return (
    item && (
      <HStack
        width={["300vw", "100%"]}
        bgColor={"white"}
        padding={[8]}
        mb={[8, 4]}>
        <HStack
          space={2}
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
          width={"1/6"}>
          <Text fontWeight={"light"} fontSize={"lg"}>
            {item.bankName}
          </Text>
          {/* <Pressable onPress={() => navigate(`/${item.bankId_}`)}>
            <AiFillInfoCircle size={20} color="#1e293b" />
          </Pressable> */}
        </HStack>
        <Box
          display={"flex"}
          alignItems="center"
          justifyContent="center"
          width={"1/6"}>
          <Box bgColor={status(item.status)} width="60%" borderRadius="8px">
            <Text
              textAlign={"center"}
              padding={1}
              textTransform="uppercase"
              color="white"
              fontWeight={"semibold"}>
              {item.status === 0
                ? "pending"
                : item.status === 1
                ? "approved"
                : "rejected"}
            </Text>
          </Box>
        </Box>
        <Box
          display={"flex"}
          alignItems="center"
          justifyContent="center"
          width={"1/6"}>
          <Box
            bgColor={status(item.dataRequest)}
            width="60%"
            borderRadius="8px">
            <Text
              textAlign={"center"}
              padding={1}
              textTransform="uppercase"
              color="white"
              fontWeight={"semibold"}>
              {item.dataRequest === 0
                ? "pending"
                : item.dataRequest === 1
                ? "approved"
                : "rejected"}
            </Text>
          </Box>
        </Box>
        <HStack alignItems="center" justifyContent="center" width={"1/6"}>
          <Tooltip
            width="auto"
            label={item.additionalNotes}
            placement={"bottom left"}>
            <Text pl={2} fontWeight={"semibold"} color="coolGray.400">
              {item.additionalNotes?.slice(0, 20).concat("...")}
            </Text>
          </Tooltip>
        </HStack>
        <Box
          cursor={"pointer"}
          width={"1/6"}
          justifyContent="center"
          alignItems={"center"}>
          <CopyToClipboard
            text={item.bankId_}
            onCopy={() => toastSuccess("Address copied successfully")}>
            <Text fontWeight={"light"} fontSize={"xl"}>
              <Tooltip
                maxWidth={"100%"}
                label={"Click to copy"}
                placement={"bottom"}>
                {truncateString(item.bankId_)}
              </Tooltip>
            </Text>
          </CopyToClipboard>
        </Box>

        {loader ? (
          <HStack width="1/6" justifyContent="center">
            <Spinner size="lg" />
          </HStack>
        ) : (
          <HStack width="1/6" space="8" justifyContent="flex-end">
            {item.dataRequest === 0 && (
              <HStack space="8">
                <Tooltip
                  maxWidth={"100%"}
                  label={"Accept data request"}
                  placement={"bottom"}>
                  <button
                    onClick={() => {
                      dataHashCheck();
                      setApprovalFlag(true);
                    }}>
                    <AiFillCheckCircle
                      size={20}
                      cursor="pointer"
                      color="green"
                    />
                  </button>
                </Tooltip>
                <Tooltip
                  maxWidth={"100%"}
                  label={"Reject data request"}
                  placement={"bottom"}>
                  <button
                    onClick={() => {
                      dataHashCheck();
                      setApprovalFlag(false);
                    }}>
                    <MdCancel size={20} cursor="pointer" color="red" />
                  </button>
                </Tooltip>
              </HStack>
            )}

            {(item.status === 0 || item.status === 1) &&
              item.dataRequest === 1 && (
                <Tooltip
                  maxWidth={"100%"}
                  label={"Revoke permission"}
                  placement={"bottom"}>
                  <button
                    style={{ marginLeft: "4rem" }}
                    onClick={() => setModalVisible(true)}>
                    <AiOutlineRedo size={20} cursor="pointer" color="#facc15" />
                  </button>
                </Tooltip>
              )}
            <Tooltip maxWidth={"100%"} label={"View Bank"} placement={"bottom"}>
              <button onClick={() => navigate(`/${item.bankId_}`)}>
                <GrView size={20} cursor="pointer" color="#facc15" />
              </button>
            </Tooltip>
          </HStack>
        )}
        <ConfirmAction
          setApproval={setApprovalFlag}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          kycAction={kycAction}
          heading="Data Permission"
          message={modalMessage}
        />
      </HStack>
    )
  );
};
