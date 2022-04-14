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
  Pressable,
  Select,
  Spinner,
  Text,
  VStack,
} from "native-base";
import { Layout } from "../../components";
import { AiOutlinePlusCircle, AiOutlineSave } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Card } from "./components";
import { toastSuccess, truncateString } from "../../utils";
import { useAuthContext } from "../../contexts/auth-context";
import CopyToClipboard from "react-copy-to-clipboard";
import { useIpfs } from "../../hooks/useIpfs";
import { convertToBase64 } from "../../utils/imageToBase64";
import { EditProfileModal } from "./components/edit-modal";
import { useApi } from "../../hooks/useApi";
import { Customer, KycServices } from "../../repository";
import { ConfirmAction } from "./components/confirm-action";
import { DocumentSkeleton } from "./components/skeleton";

type docsType = {
  id: string;
  type: string;
  documentUrl: string;
};
let docsRequired = ["aadhar", "pancard", "passport", "voterid"];

export function ProfilePage() {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [document, setDocument] = useState(docsRequired[0]);
  const [docList, setDocList] = useState(docsRequired);
  const [fileUrl, setFileUrl] = useState<any>("");
  const [allDocs, setAllDocs] = useState<docsType[]>([] as docsType[]);
  const [showFirstImage, setShowFirstImage] = useState<boolean>(false);
  const [myData, setMyData] = useState<Customer>({} as Customer);
  const {
    state: {
      userDetails: { id_ },
    },
  } = useAuthContext();
  const [userAddress, setUserAddress] = useState(truncateString(id_));
  const { upload, getDataFromIpfs } = useIpfs();
  const { getCustomerDetails, updateDatahash } = useApi();
  const [showSaveButton, setSaveButton] = useState<boolean>(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [loader, setLoader] = useState<boolean>(true);
  const [noDocMessage, setNoDocMessage] = useState<boolean>(false);
  const [saveLoader, setSaveLoader] = useState<boolean>(false);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      setFileUrl(base64);
      setDocument("");
      setShowModal(false);
    }
  }

  const compareFunction = (
    allDocItem: docsType,
    updatedAllDocsItem: docsType
  ) => allDocItem.type === updatedAllDocsItem.type;

  useEffect(() => {
    if (fileUrl !== "") {
      const updatedAllDocs = [
        ...allDocs,
        {
          id: Date.now().toString(),
          documentUrl: fileUrl,
          type: document,
        },
      ];

      setAllDocs(updatedAllDocs);
      setSaveButton(true);
      setFileUrl("");
    }
  }, [fileUrl]);

  function handleDelete(id: string) {
    setShowFirstImage(true);
    setDocument(allDocs.find((i) => i.id === id)?.type || "");
    const updatedAllDocs = allDocs.filter((doc: docsType) => doc.id !== id);
    if (updatedAllDocs.length === allDocs.length) {
      console.log("working");
      const result = allDocs.forEach(
        (leftValue) =>
          !updatedAllDocs.some((rightValue) =>
            compareFunction(leftValue, rightValue)
          )
      );
      console.log(result, "equals");
    }

    setAllDocs(updatedAllDocs);
    setSaveButton(true);
    setShowModal(true);
  }
  function handlefirstDocImage(id: string) {
    setDocument(allDocs.find((i) => i.id === id)?.type || "");
    const temp = allDocs.filter((i) => i.id !== id);
    setAllDocs(temp);
    setShowModal(true);
  }

  useEffect(() => {
    setDocList(() => {
      return docsRequired.filter(
        (i: string) => !allDocs.map((i) => i.type).includes(i)
      );
    });
  }, [allDocs]);

  const uplaodToIpfs = async () => {
    setSaveLoader(true);
    const jsonData = JSON.stringify(allDocs);
    const result = await upload(jsonData);
    if (result) {
      updateDatahash(result.path);
      listenToDahaHashEvent();
    }
    setSaveLoader(false);
  };

  useEffect(() => {
    if (myData.dataHash) {
      (async () => {
        try {
          const result: any = await getDataFromIpfs(myData.dataHash);
          setAllDocs(result);
        } catch (error) {
          console.log(error);
        } finally {
          setLoader(false);
          setNoDocMessage(false);
        }
      })();
    } else {
      setLoader(false);
    }
  }, [myData]);

  useEffect(() => {
    if (!loader && !myData.dataHash) {
      setNoDocMessage(true);
    }
  }, [loader]);

  useEffect(() => {
    (async () => {
      setLoader(true);
      const data = await getCustomerDetails(id_);
      if (data) {
        setMyData(data);
      }
    })();
  }, [id_]);

  // event CustomerDataUpdated(address id_, string name, string email);
  // event DataHashUpdated(address id_, string customerName, string dataHash);

  const listenToDahaHashEvent = async () => {
    KycServices.eventContract.on(
      "DataHashUpdated",
      async (id_, customerName, dataHash) => {
        console.log("event", customerName, dataHash);
        const data = await getCustomerDetails(id_);

        if (data) {
          setMyData(data);
        }
      }
    );
  };

  useEffect(() => {
    listenToCustomerDataEvent();
  }, []);

  const listenToCustomerDataEvent = () => {
    KycServices.eventContract.on(
      "CustomerDataUpdated",
      async (id_, name, email) => {
        console.log("event", name);
        const data = await getCustomerDetails(id_);
        if (data) {
          setMyData(data);
        }
      }
    );
  };

  return (
    <Layout>
      <Center>
        <Box
          bg="white"
          w={["90vw", "70vw"]}
          minH="40vh"
          p="8"
          mt="16"
          borderRadius={"10"}
          position={"relative"}>
          {loader && (
            <VStack space="50" justifyContent={"center"} alignItems="center">
              <Heading>Please wait...</Heading>
            </VStack>
          )}
          {!loader && (
            <VStack>
              <HStack
                alignItems={"center"}
                justifyContent="space-between"
                mb="4">
                <HStack
                  flexDir={["column", "row"]}
                  alignItems={["flex-start", "center"]}>
                  <Avatar
                    my="4"
                    bg="green.500"
                    source={{
                      uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                    }}
                    size={["md", "xl"]}>
                    AJ
                  </Avatar>
                  <Pressable
                    onHoverIn={() => setUserAddress(id_)}
                    onHoverOut={() => setUserAddress(truncateString(id_))}>
                    <CopyToClipboard
                      text={id_}
                      onCopy={() =>
                        toastSuccess("Address copied successfully")
                      }>
                      <Heading size="md" ml={["1", "5"]}>
                        {userAddress}
                      </Heading>
                    </CopyToClipboard>
                  </Pressable>
                </HStack>
                <Button
                  bgColor="blueGray.800"
                  _hover={{ bgColor: "blueGray.600" }}
                  onPress={() => setShowEditModal(true)}>
                  Edit Profile
                </Button>
              </HStack>
              <HStack flexDir={["column", "row"]} mb="4" space={["12"]}>
                <FormControl isDisabled w={["100%", "45%"]}>
                  <FormControl.Label>Email</FormControl.Label>
                  <Input value={myData.email} />
                </FormControl>
                <FormControl isDisabled w={["100%", "45%"]}>
                  <FormControl.Label>Name</FormControl.Label>
                  <Input value={myData.name} />
                </FormControl>
              </HStack>
              <HStack flexDir={["column", "row"]} space={["12"]}>
                <FormControl isDisabled w={["100%", "45%"]}>
                  <FormControl.Label>Phone Number</FormControl.Label>
                  <Input value={myData.mobileNumber} />
                </FormControl>
              </HStack>
            </VStack>
          )}
        </Box>
        <VStack w={["90vw", "70vw"]} mt="16">
          <HStack alignItems={"flex-start"} mb="12" space={5}>
            <Heading color={"white"}>Documents</Heading>
            {allDocs.length !== docsRequired.length && (
              <IconButton
                size="lg"
                p="0"
                mt="1.5"
                ml="3"
                onPress={() => setShowModal(true)}
                icon={
                  <AiOutlinePlusCircle style={{ color: "white" }} size="30" />
                }
              />
            )}
            {allDocs.length > 0 && (
              <IconButton
                p="0"
                mt="1.5"
                isDisabled={!showSaveButton ? true : false}
                ml="3"
                onPress={() => showSaveButton && setShowUploadModal(true)}
                icon={
                  saveLoader ? (
                    <Spinner size="lg" />
                  ) : (
                    <AiOutlineSave style={{ color: "white" }} size="30" />
                  )
                }
              />
            )}
          </HStack>
          {showModal && (
            <HStack flexDir={["column", "row"]}>
              <Select
                bg={"white"}
                color="black"
                selectedValue={document}
                size="lg"
                onValueChange={(nextValue) => setDocument(nextValue)}
                _selectedItem={{
                  color: "white",
                  endIcon: <BsCheckCircleFill size={4} />,
                }}
                accessibilityLabel="Select a position for Menu"
                mr={["0", "4"]}
                mb={["4", "0"]}>
                {docList.map((doc) => (
                  <Select.Item key={doc} label={doc} value={doc} />
                ))}
              </Select>
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleFileChange(e)
                }
                className="file-input"
                type="file"
                accept="image/png, image/jpeg"
                disabled={document === "" ? true : false}
              />
            </HStack>
          )}
          <HStack flexWrap={"wrap"}>
            {loader && (
              <>
                <DocumentSkeleton />
              </>
            )}
            {allDocs.length !== 0 &&
              loader === false &&
              allDocs.map(({ id, documentUrl, type }, idx) => (
                <Card
                  key={id}
                  id={id}
                  handleDelete={handleDelete}
                  showButton={idx !== 0}
                  documentUrl={documentUrl}
                  type={type}
                  setImage={
                    showFirstImage || allDocs.length > 1
                      ? null
                      : (id: string) => handlefirstDocImage(id)
                  }
                />
              ))}

            {myData && !loader && noDocMessage && allDocs.length === 0 && (
              <Text color="white" fontSize={"2xl"} textAlign="center">
                {showModal ? "" : "No Documents Found"}
              </Text>
            )}
          </HStack>
          <EditProfileModal
            data={myData}
            showModal={showEditModal}
            setShowModal={setShowEditModal}
          />
          <ConfirmAction
            setModalVisible={setShowUploadModal}
            modalVisible={showUploadModal}
            uploadDetails={uplaodToIpfs}
          />
        </VStack>
      </Center>
    </Layout>
  );
}
