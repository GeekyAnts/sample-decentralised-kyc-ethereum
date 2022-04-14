import { Box, HStack, Spinner, Text, Tooltip } from "native-base";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { AiFillCheckCircle, AiOutlineRedo } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toastSuccess, toastError } from "../../../utils/toastMessage";
import "../../../styles/style.css";
import { DataHashStatus, KycRequest, KycStatus } from "../../../repository";
import { ConfirmAction } from "./confirm-action";
import { BsEyeFill } from "react-icons/bs";

export const DetailsCard = ({ item }: { item: KycRequest }) => {
  const truncateString = (address: string) => {
    const prefix = address.substring(0, 4).concat("...");
    const postfix = address.substring(address.length - 4);
    return prefix + postfix;
  };
  const [loading, setLoading] = useState(false);
  const [operation, setOperation] = useState<"accept" | "reject" | "reapply">();
  const [modalVisible, setModalVisible] = useState(false);
  let navigate = useNavigate();
  const statusColor = (status: KycStatus) => {
    if (status === KycStatus.Pending) {
      return "orange.400";
    } else if (status === KycStatus.KYCVerified) {
      return "green.400";
    } else if (status === KycStatus.KYCFailed) {
      return "red.400";
    }
  };
  function checkDataHash(callbacks: Function[]) {
    if (item.dataHash === "") {
      toastError("KYC operation cannot be performed with 0 documents!");
    } else if (
      item.dataRequest === DataHashStatus.Pending ||
      item.dataRequest === DataHashStatus.Rejected
    ) {
      toastError(
        "KYC operation cannot be performed, without document pending or rejected viewing permission!"
      );
    } else {
      callbacks.map((func) => func());
    }
  }
  return (
    item && (
      <HStack
        width={["300vw", "100%"]}
        bgColor={"white"}
        padding={8}
        mb={[8, 3]}
      >
        <Text w="1/6" textAlign={"center"} fontWeight={"light"} fontSize={"lg"}>
          {item.customerName}
        </Text>
        <Box
          cursor={"pointer"}
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
          paddingLeft={2}
          width={"1/6"}
        >
          <CopyToClipboard
            text={item.dataHash}
            onCopy={() => toastSuccess("Data hash copied successfully")}
          >
            <Text fontWeight={"light"} fontSize={"xl"}>
              {truncateString(item.dataHash)}
            </Text>
          </CopyToClipboard>
        </Box>
        <Box
          display={"flex"}
          justifyContent="center"
          paddingLeft={4}
          width={"1/6"}
        >
          <Box
            bgColor={statusColor(item.status)}
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
              {item.status === KycStatus.KYCFailed
                ? "failed"
                : item.status === KycStatus.KYCVerified
                ? "verified"
                : "pending"}
            </Text>
          </Box>
        </Box>
        <HStack alignItems="center" justifyContent="center" width={"1/6"}>
          <Tooltip
            width="auto"
            label={item.additionalNotes}
            placement={"bottom left"}
          >
            <Text pl={2} fontWeight={"semibold"} color="coolGray.400">
              {item.additionalNotes?.slice(0, 20).concat("...")}
            </Text>
          </Tooltip>
        </HStack>
        <Box
          cursor={"pointer"}
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
          paddingLeft={5}
          width={"1/6"}
        >
          <CopyToClipboard
            text={item.userId_}
            onCopy={() => toastSuccess("Address copied successfully")}
          >
            <Text fontWeight={"light"} fontSize={"xl"}>
              <Tooltip
                maxWidth={"100%"}
                label={"Click to copy"}
                placement={"bottom"}
              >
                {truncateString(item.userId_)}
              </Tooltip>
            </Text>
          </CopyToClipboard>
        </Box>

        <HStack justifyContent={"flex-end"} width="1/6">
          {loading ? (
            <Spinner size={"lg"} />
          ) : (
            <>
              {item.status === KycStatus.Pending && (
                <HStack space={4}>
                  <Tooltip placement="bottom" label="Accept KYC">
                    <button
                      onClick={() =>
                        checkDataHash([
                          () => setOperation("accept"),
                          () => setModalVisible(true),
                        ])
                      }
                    >
                      <AiFillCheckCircle
                        size={20}
                        cursor="pointer"
                        color="green"
                      />
                    </button>
                  </Tooltip>
                  <Tooltip placement="bottom" label="Reject KYC">
                    <button
                      onClick={() =>
                        checkDataHash([
                          () => setOperation("reject"),
                          () => setModalVisible(true),
                        ])
                      }
                    >
                      <MdCancel size={20} cursor="pointer" color="red" />
                    </button>
                  </Tooltip>
                </HStack>
              )}
              {item.status === KycStatus.KYCVerified && (
                <Tooltip placement="bottom" label="re-apply kyc">
                  <button
                    style={{ marginLeft: "4rem" }}
                    onClick={() => {
                      setOperation("reapply");
                      setModalVisible(true);
                    }}
                  >
                    <AiOutlineRedo
                      className="card-icon"
                      size={20}
                      cursor="pointer"
                      color="#facc15"
                    />
                  </button>
                </Tooltip>
              )}
              <Tooltip placement="bottom" label="view details">
                <button
                  style={{ marginLeft: "1rem" }}
                  onClick={() =>
                    navigate(`/${item.userId_}`, {
                      state: { permission: item.dataRequest },
                    })
                  }
                >
                  <BsEyeFill color="green" size={20} />
                </button>
              </Tooltip>
            </>
          )}
        </HStack>
        {modalVisible && operation && (
          <ConfirmAction
            id={item.userId_}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            operation={operation}
            loading={loading}
            setLoading={setLoading}
          />
        )}
      </HStack>
    )
  );
};
