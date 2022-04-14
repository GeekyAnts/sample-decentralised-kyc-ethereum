import {
  Avatar,
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  IconButton,
  Input,
  Spinner,
  Text,
  VStack,
} from "native-base";
import { Layout } from "../../components";
import { useEffect, useState } from "react";
import { truncateString } from "../../utils/trancare-string";
import { ViewImage } from "./components/modal";
import CopyToClipboard from "react-copy-to-clipboard";
import { toastSuccess, toastError } from "../../utils/toastMessage";
import { AiFillEye, AiFillPrinter, AiOutlineDownload } from "react-icons/ai";
import { saveAs } from "file-saver";
import printJS from "print-js";
import { ScreenHeader } from "../../components/screen-header";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import { Customer, DataHashStatus } from "../../repository";
import { useIpfs } from "../../hooks/useIpfs";
import { DocumentSkeleton } from "../profile/components/skeleton";

export function EntityDetails() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [url, setUrl] = useState<string>(
    "https://d2gg9evh47fn9z.cloudfront.net/1600px_COLOURBOX38669095.jpg"
  );
  const [documents, setDocuments] = useState<
    { id: string; type: string; documentUrl: string }[]
  >([]);
  const [type, setType] = useState<string>("aadhar");
  const [loading, setLoading] = useState(false);
  const [docLoading, setDocLoading] = useState(true);
  const [data, setData] = useState<Customer>();
  let navigate = useNavigate();
  const { state }: { state: any } = useLocation();
  const { getCustomerDetails } = useApi();
  const { getDataFromIpfs } = useIpfs();
  const { id } = useParams();
  async function getUserData(data: string) {
    try {
      setLoading(true);
      const result = await getCustomerDetails(data);
      result && setData(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function getDocs(hash: string) {
    try {
      setDocLoading(true);
      const res = await getDataFromIpfs(hash);
      setDocuments(res);
    } catch (error) {
      console.log(error);
    } finally {
      setDocLoading(false);
    }
  }

  useEffect(() => {
    id && getUserData(id);
    if (state.permission === DataHashStatus.Pending) {
      toastError("Document viewing permission is pending");
    } else if (state.permission === DataHashStatus.Rejected) {
      toastError("Document viewing permission denied by customer");
    }
  }, []);

  useEffect(() => {
    data && state.permission === DataHashStatus.Approved && data.dataHash !== ""
      ? getDocs(data.dataHash)
      : setDocLoading(false);
  }, [data]);

  return (
    <Layout>
      {loading ? (
        <Center mt="10">
          <Spinner size="lg" />
        </Center>
      ) : !data ? (
        <Center mt="20">
          <Text color="white" fontSize={"4xl"} textAlign="center" mt="5">
            No Data Found
          </Text>
          <Button mt="5" onPress={() => navigate("/")}>
            Go Home
          </Button>
        </Center>
      ) : (
        <Center>
          <Box
            bg="white"
            w={["90vw", "60vw"]}
            minH="40vh"
            p="8"
            mt="16"
            borderRadius={"10"}
            position={"relative"}
          >
            <VStack>
              <ScreenHeader text="Back" route="/dashboard" />
              <HStack
                alignItems={"center"}
                justifyContent="space-between"
                mb="4"
              >
                <HStack
                  flexDir={["column", "row"]}
                  alignItems={["flex-start", "center"]}
                >
                  <Avatar
                    my="4"
                    bg="green.500"
                    source={{
                      uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                    }}
                    size={["md", "xl"]}
                  >
                    AJ
                  </Avatar>
                  <VStack ml={["1", "5"]}>
                    <CopyToClipboard
                      text={data?.id_ || ""}
                      onCopy={() => toastSuccess("Address copied successfully")}
                    >
                      <Text color="black" fontSize={"2xl"}>
                        {truncateString(data?.id_ || "")}
                      </Text>
                    </CopyToClipboard>

                    <Text color={"coolGray.600"}>
                      Updated At : Mar 21, 9:30 am {/* {data } */}
                    </Text>
                  </VStack>
                </HStack>
              </HStack>
              <VStack mb="4" space={["4"]}>
                <HStack
                  justifyContent="space-between"
                  flexDirection={["column", "row"]}
                >
                  <FormControl w={["100%", "45%"]} isDisabled>
                    <FormControl.Label>Email</FormControl.Label>
                    <Input value={data?.email} />
                  </FormControl>
                  <FormControl w={["100%", "45%"]} isDisabled>
                    <FormControl.Label>Name</FormControl.Label>
                    <Input value={data?.name} />
                  </FormControl>
                </HStack>
                <HStack
                  flexDirection={["column", "row"]}
                  justifyContent="space-between"
                >
                  <FormControl w={["100%", "45%"]} isDisabled>
                    <FormControl.Label>Phone Number</FormControl.Label>
                    <Input value={data?.mobileNumber.toString()} />
                  </FormControl>
                  <CopyToClipboard
                    text={data?.id_ || ""}
                    onCopy={() => toastSuccess("Address copied successfully")}
                  >
                    <FormControl w={["100%", "45%"]} isDisabled>
                      <FormControl.Label>Address</FormControl.Label>
                      <Input value={data?.id_} />
                    </FormControl>
                  </CopyToClipboard>
                </HStack>
              </VStack>
            </VStack>
          </Box>
          <VStack w={["90vw", "60vw"]} mt="10">
            <HStack alignItems={"flex-start"} mb="12">
              <Heading color={"white"}>Documents</Heading>
            </HStack>
            <HStack
              flexDirection={["column", "row"]}
              flexWrap="wrap"
              w={["90vw", "60vw"]}
            >
              {docLoading ? (
                <DocumentSkeleton />
              ) : documents.length === 0 ? (
                <Text color={"white"} fontSize="lg" textAlign={"center"}>
                  No documents found
                </Text>
              ) : (
                documents.map((doc) => {
                  return (
                    <VStack
                      margin={["3", 10]}
                      height={["40vh"]}
                      width={["35vh", "42vh"]}
                      space={5}
                      alignSelf={["center", "flex-start"]}
                      borderWidth="2"
                      borderColor={"cyan.300"}
                      px="4"
                      py="5"
                      borderRadius={8}
                    >
                      <HStack space={5} alignItems="center">
                        <Text
                          fontSize="lg"
                          textTransform="capitalize"
                          color="white"
                        >
                          {doc.type}
                        </Text>
                        <IconButton
                          onPress={() => {
                            setShowModal(true);
                            setUrl(doc.documentUrl);
                            setType(doc.type);
                          }}
                          borderWidth={1}
                          padding={3}
                          icon={<AiFillEye size={20} color="white" />}
                          borderColor={"cyan.300"}
                          bgColor={"transperant"}
                        />

                        <IconButton
                          onPress={() => printJS(doc.documentUrl, "image")}
                          borderWidth={1}
                          padding={3}
                          borderColor={"cyan.300"}
                          bgColor={"transperant"}
                          icon={<AiFillPrinter size={20} color="white" />}
                        />
                        <IconButton
                          onPress={() =>
                            saveAs(doc.documentUrl, `${doc.type}.jpg`)
                          }
                          borderWidth={1}
                          padding={3}
                          borderColor={"cyan.300"}
                          bgColor={"transperant"}
                          icon={<AiOutlineDownload size={20} color="white" />}
                        />
                      </HStack>
                      <Center>
                        {doc.documentUrl !== "" && (
                          <img
                            className="doc-img"
                            key={doc.documentUrl}
                            src={doc.documentUrl}
                            alt={doc.type}
                          />
                        )}
                      </Center>
                    </VStack>
                  );
                })
              )}
            </HStack>
          </VStack>
        </Center>
      )}
      {showModal && (
        <ViewImage url={url} type={type} setShowModal={setShowModal} />
      )}
    </Layout>
  );
}
