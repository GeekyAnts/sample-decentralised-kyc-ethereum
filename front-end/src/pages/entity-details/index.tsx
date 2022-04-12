import {
  Avatar,
  Box,
  Center,
  FormControl,
  Heading,
  HStack,
  IconButton,
  Input,
  Text,
  VStack,
} from "native-base";
import { Layout } from "../../components";
import { useState } from "react";
import { truncateString } from "../../utils/trancare-string";
import { ViewImage } from "./components/modal";
import CopyToClipboard from "react-copy-to-clipboard";
import { toastSuccess } from "../../utils/toastMessage";
import { AiFillEye, AiFillPrinter, AiOutlineDownload } from "react-icons/ai";
import { saveAs } from "file-saver";
import printJS from "print-js";
import { ScreenHeader } from "../../components/screen-header";

const documents = [
  {
    type: "aadhar",
    img_url:
      "https://upload.wikimedia.org/wikipedia/commons/3/3f/A_sample_of_Aadhaar_card.jpg",
  },
  {
    type: "pancard",
    img_url: "https://www.immihelp.com/nri/images/sample-pan-card-front.jpg",
  },
  {
    type: "passport",
    img_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Biodata_page_of_Singapore_Passport.jpg/440px-Biodata_page_of_Singapore_Passport.jpg",
  },
  {
    type: "voterid",
    img_url:
      "https://media.istockphoto.com/vectors/driver-license-with-male-photo-identification-or-id-card-template-vector-id1073597286?k=20&m=1073597286&s=612x612&w=0&h=mZZD51mPK3MD8TLKBtUAcTewBIaHeRCr1HfWu9Dy974=",
  },
];

export function EntityDetails() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [url, setUrl] = useState<string>(
    "https://d2gg9evh47fn9z.cloudfront.net/1600px_COLOURBOX38669095.jpg"
  );
  const [type, setType] = useState<string>("aadhar");

  return (
    <Layout>
      <Center>
        <Box
          bg="white"
          w={["90vw", "60vw"]}
          minH="40vh"
          p="8"
          mt="16"
          borderRadius={"10"}
          position={"relative"}>
          <VStack>
            <ScreenHeader text="Back" route="/dashboard" />
            <HStack alignItems={"center"} justifyContent="space-between" mb="4">
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
                <VStack ml={["1", "5"]}>
                  <CopyToClipboard
                    text={"0xd034739c2ae807c70cd703092b946f62a49509d1"}
                    onCopy={() => toastSuccess("Address copied successfully")}>
                    <Text color="black" fontSize={"2xl"}>
                      {truncateString(
                        "0xd034739c2ae807c70cd703092b946f62a49509d1"
                      )}
                    </Text>
                  </CopyToClipboard>

                  <Text color={"coolGray.600"}>
                    Updated At : Mar 21, 9:30 am
                  </Text>
                </VStack>
              </HStack>
              <Box bgColor={"green.400"} w={"15vw"} borderRadius="8px">
                <Text
                  textAlign={"center"}
                  padding={1}
                  textTransform="uppercase"
                  fontWeight={"semibold"}>
                  Active
                </Text>
              </Box>
            </HStack>
            <VStack mb="4" space={["4"]}>
              <HStack
                justifyContent="space-between"
                flexDirection={["column", "row"]}>
                <FormControl w={["100%", "45%"]} isDisabled>
                  <FormControl.Label>Email</FormControl.Label>
                  <Input value="James@gmail.com" />
                </FormControl>
                <FormControl w={["100%", "45%"]} isDisabled>
                  <FormControl.Label>Name</FormControl.Label>
                  <Input value="James Rodriguez" />
                </FormControl>
              </HStack>
              <HStack
                flexDirection={["column", "row"]}
                justifyContent="space-between">
                <FormControl w={["100%", "45%"]} isDisabled>
                  <FormControl.Label>Phone Number</FormControl.Label>
                  <Input value="9090909090" />
                </FormControl>
                <CopyToClipboard
                  text={"0xd034739c2ae807c70cd703092b946f62a49509d1"}
                  onCopy={() => toastSuccess("Address copied successfully")}>
                  <FormControl w={["100%", "45%"]} isDisabled>
                    <FormControl.Label>Address</FormControl.Label>
                    <Input value="0xd034739c2ae807c70cd703092b946f62a49509d1" />
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
            w={["90vw", "60vw"]}>
            {documents.map((doc) => {
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
                  borderRadius={8}>
                  <HStack space={5} alignItems="center">
                    <Text
                      fontSize="lg"
                      textTransform="capitalize"
                      color="white">
                      {doc.type}
                    </Text>
                    <IconButton
                      onPress={() => {
                        setShowModal(true);
                        setUrl(doc.img_url);
                        setType(doc.type);
                      }}
                      borderWidth={1}
                      padding={3}
                      icon={<AiFillEye size={20} color="white" />}
                      borderColor={"cyan.300"}
                      bgColor={"transperant"}
                    />

                    <IconButton
                      onPress={() => printJS(doc.img_url, "image")}
                      borderWidth={1}
                      padding={3}
                      borderColor={"cyan.300"}
                      bgColor={"transperant"}
                      icon={<AiFillPrinter size={20} color="white" />}
                    />
                    <IconButton
                      onPress={() => saveAs(doc.img_url, `${doc.type}.jpg`)}
                      borderWidth={1}
                      padding={3}
                      borderColor={"cyan.300"}
                      bgColor={"transperant"}
                      icon={<AiOutlineDownload size={20} color="white" />}
                    />
                  </HStack>
                  <Center>
                    {doc.img_url !== "" && (
                      <img
                        className="doc-img"
                        key={doc.img_url}
                        src={doc.img_url}
                        alt={doc.type}
                      />
                    )}
                  </Center>
                </VStack>
              );
            })}
          </HStack>
        </VStack>
      </Center>
      {showModal && (
        <ViewImage url={url} type={type} setShowModal={setShowModal} />
      )}
    </Layout>
  );
}
