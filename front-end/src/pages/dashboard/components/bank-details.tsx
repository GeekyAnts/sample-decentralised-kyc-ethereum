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
  Text,
  VStack,
} from "native-base";
import { Layout } from "../../../components";
import { useEffect, useState } from "react";
import { toastError, truncateString } from "../../../utils";
import { ViewImage } from "../../entity-details/components/modal";
import CopyToClipboard from "react-copy-to-clipboard";
import { toastSuccess } from "../../../utils";

import { ScreenHeader } from "../../../components/screen-header";
import { Bank } from "../../../repository";
import { useApi } from "../../../hooks/useApi";
import { useNavigate, useParams } from "react-router-dom";

export function BankDetails() {
  const [data, setData] = useState<Bank>({} as Bank);
  const { getBankDetail } = useApi();
  const [inactiveBank, setInactiveBank] = useState<boolean>(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        if (id) {
          const result = await getBankDetail(id);
          if (result) {
            setData(result);
          }
        }
      } catch (error: any) {
        setLoading(false);
        if (error.message.includes("Bank is not active")) {
          setInactiveBank(true);
        } else {
          toastError(" Failed to fetch bank details");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

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
          {loading && (
            <VStack space="50" justifyContent={"center"} alignItems="center">
              <Heading>Please wait...</Heading>
            </VStack>
          )}
          {inactiveBank && (
            <VStack space="50" justifyContent={"center"} alignItems="center">
              <Heading>Bank is not active</Heading>
              <Button
                bgColor="blueGray.800"
                _hover={{ bgColor: "blueGray.600" }}
                maxWidth={"50%"}
                onPress={() => navigate("/dashboard")}>
                Go Back
              </Button>
            </VStack>
          )}
          {!inactiveBank && data.id_ && (
            <VStack>
              <ScreenHeader text="Back" route="/dashboard" />
              <HStack
                alignItems={"center"}
                justifyContent="space-between"
                mb="4">
                <HStack
                  flexDir={["column", "row"]}
                  alignItems={["flex-start", "center"]}>
                  <VStack ml={["1", ""]}>
                    <Text color="black" fontSize={"2xl"}>
                      Bank Details
                    </Text>
                  </VStack>
                </HStack>
              </HStack>
              <VStack mb="4" space={["4"]}>
                <HStack
                  justifyContent="space-between"
                  flexDirection={["column", "row"]}>
                  <FormControl w={["100%", "45%"]} isDisabled>
                    <FormControl.Label>Email</FormControl.Label>
                    <Input value={data.email} />
                  </FormControl>
                  <FormControl w={["100%", "45%"]} isDisabled>
                    <FormControl.Label>Name</FormControl.Label>
                    <Input value={data.name} />
                  </FormControl>
                </HStack>
                <HStack
                  flexDirection={["column", "row"]}
                  justifyContent="space-between">
                  <FormControl w={["100%", "45%"]} isDisabled>
                    <FormControl.Label>IFSC code</FormControl.Label>
                    <Input value={data.ifscCode} />
                  </FormControl>
                  <CopyToClipboard
                    text={data.id_}
                    onCopy={() => toastSuccess("Address copied successfully")}>
                    <FormControl w={["100%", "45%"]} isDisabled>
                      <FormControl.Label>Address</FormControl.Label>
                      <Input value={data.id_} />
                    </FormControl>
                  </CopyToClipboard>
                </HStack>
              </VStack>
            </VStack>
          )}
        </Box>
      </Center>
    </Layout>
  );
}
