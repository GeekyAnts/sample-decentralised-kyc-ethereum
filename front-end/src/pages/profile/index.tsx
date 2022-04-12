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
  Text,
  VStack,
} from "native-base";
import { Layout } from "../../components";
import { AiOutlinePlusCircle } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Card } from "./components";
import { useAuth } from "../../hooks/useAuth";
import { toastSuccess, truncateString } from "../../utils";
import { useAuthContext } from "../../contexts/auth-context";
import CopyToClipboard from "react-copy-to-clipboard";

type docsType = {
  id: string;
  type: string;
  documentUrl: string;
};
let docsRequired = ["aadhar card", "pan card", "passport", "voter id"];
export function ProfilePage() {
  const [showModal, setShowModal] = useState(false);
  const [document, setDocument] = useState(docsRequired[0]);
  const [docList, setDocList] = useState(docsRequired);
  const [fileUrl, setFileUrl] = useState("");
  const [allDocs, setAllDocs] = useState<docsType[]>([] as docsType[]);
  const [showFirstImage, setShowFirstImage] = useState(false);
  const { disConnect } = useAuth();
  const {
    state: {
      userDetails: { address },
    },
  } = useAuthContext();
  const [userAddress, setUserAddress] = useState(truncateString(address));

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      setFileUrl(URL.createObjectURL(file));
      setShowModal(false);
    }
  }

  useEffect(() => {
    if (fileUrl !== "") {
      const temp = [
        ...allDocs,
        {
          id: Date.now().toString(),
          documentUrl: fileUrl,
          type: document,
        },
      ];
      setAllDocs(temp);
      // setDocList(
      //   docList.filter((i: string) => !temp.map((i) => i.type).includes(i))
      // );
    }
  }, [fileUrl]);

  function handleDelete(id: string) {
    setShowFirstImage(true);
    setDocument(allDocs.find((i) => i.id === id)?.type || "");
    setAllDocs((curr) => curr.filter((doc) => doc.id !== id));
    // const [temp] = allDocs.filter((i) => i.id === id);
    // setDocList((curr) => [...curr, temp.type]);
    setShowModal(true);
  }
  function handlefirstDocImage(id: string) {
    setDocument(allDocs.find((i) => i.id === id)?.type || "");
    const temp = allDocs.filter((i) => i.id !== id);
    setAllDocs(temp);
    setShowModal(true);
  }

  useEffect(() => {
    setDocList(() =>
      docsRequired.filter(
        (i: string) => !allDocs.map((i) => i.type).includes(i)
      )
    );
  }, [allDocs]);

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
          position={"relative"}
        >
          <VStack>
            <HStack alignItems={"center"} justifyContent="space-between" mb="4">
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
                <Pressable
                  onHoverIn={() => setUserAddress(address)}
                  onHoverOut={() => setUserAddress(truncateString(address))}
                >
                  <CopyToClipboard
                    text={address}
                    onCopy={() => toastSuccess("Address copied successfully")}
                  >
                    <Heading size="md" ml={["1", "5"]}>
                      {userAddress}
                    </Heading>
                  </CopyToClipboard>
                </Pressable>
              </HStack>
              {/* <Button
                top={["5", "0"]}
                right={["-10", "0"]}
                size="lg"
                w="100"
                position={["absolute", "relative"]}
                colorScheme="danger"
                onPress={() => disConnect()}
              >
                disconnect
              </Button> */}
            </HStack>
            <HStack flexDir={["column", "row"]} mb="4" space={["12"]}>
              <FormControl w={["100%", "45%"]}>
                <FormControl.Label>Email</FormControl.Label>
                <Input />
              </FormControl>
              <FormControl w={["100%", "45%"]}>
                <FormControl.Label>Name</FormControl.Label>
                <Input />
              </FormControl>
            </HStack>
            <HStack flexDir={["column", "row"]} space={["12"]}>
              <FormControl w={["100%", "45%"]}>
                <FormControl.Label>Phone Number</FormControl.Label>
                <Input />
              </FormControl>
            </HStack>
          </VStack>
        </Box>
        <VStack w={["90vw", "70vw"]} mt="16">
          <HStack alignItems={"flex-start"} mb="12">
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
                mb={["4", "0"]}
              >
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
            {allDocs.length !== 0 ? (
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
              ))
            ) : (
              <Text color="white" fontSize={"2xl"} textAlign="center">
                {showModal ? "" : "No Documents Found"}
              </Text>
            )}
          </HStack>
        </VStack>
      </Center>
    </Layout>
  );
}
