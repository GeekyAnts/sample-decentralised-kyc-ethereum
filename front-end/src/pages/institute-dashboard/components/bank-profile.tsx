import {
  Avatar,
  Box,
  Center,
  FormControl,
  Heading,
  HStack,
  Input,
  Pressable,
  VStack,
} from "native-base";
import { Layout } from "../../../components";
import React, { useEffect, useState } from "react";
import { toastSuccess, truncateString } from "../../../utils";
import { useAuthContext } from "../../../contexts/auth-context";
import CopyToClipboard from "react-copy-to-clipboard";
import { useApi } from "../../../hooks/useApi";
import { Bank } from "../../../repository";

export function BankProfilePage() {
  const [myData, setMyData] = useState<Bank>({} as Bank);
  const {
    state: {
      userDetails: { id_ },
    },
  } = useAuthContext();
  const [userAddress, setUserAddress] = useState(truncateString(id_));
  const { getBankDetail } = useApi();

  useEffect(() => {
    (async () => {
      const data = await getBankDetail(id_);
      if (data) {
        setMyData(data);
      }
    })();
  }, [id_]);

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
                    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_iwd7AIXCPSfJwfhDJE3COmaquPwMC8jYFA&usqp=CAU",
                  }}
                  size={["md", "xl"]}
                >
                  AJ
                </Avatar>
                <Pressable
                  onHoverIn={() => setUserAddress(id_)}
                  onHoverOut={() => setUserAddress(truncateString(id_))}
                >
                  <CopyToClipboard
                    text={id_}
                    onCopy={() => toastSuccess("Address copied successfully")}
                  >
                    <Heading size="md" ml={["1", "5"]}>
                      {userAddress}
                    </Heading>
                  </CopyToClipboard>
                </Pressable>
              </HStack>
            </HStack>
            <HStack flexDir={["column", "row"]} mb="4" space={["12"]}>
              <FormControl isDisabled w={["100%", "45%"]}>
                <FormControl.Label>Name</FormControl.Label>
                <Input value={myData.name} />
              </FormControl>
              <FormControl isDisabled w={["100%", "45%"]}>
                <FormControl.Label>Email</FormControl.Label>
                <Input value={myData.email} />
              </FormControl>
            </HStack>
            <HStack flexDir={["column", "row"]} space={["12"]}>
              <FormControl isDisabled w={["100%", "45%"]}>
                <FormControl.Label>IFSC code</FormControl.Label>
                <Input value={myData.ifscCode} />
              </FormControl>
              <FormControl isDisabled w={["100%", "45%"]}>
                <FormControl.Label>KYC count</FormControl.Label>
                <Input value={myData.kycCount} />
              </FormControl>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </Layout>
  );
}
