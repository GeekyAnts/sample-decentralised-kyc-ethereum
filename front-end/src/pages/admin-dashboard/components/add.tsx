import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Input,
  Spinner,
  Text,
  VStack,
} from "native-base";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../../components";
import { ScreenHeader } from "../../../components/screen-header";
import { useAuthContext } from "../../../contexts/auth-context";
import { useApi } from "../../../hooks/useApi";
import { KycServices } from "../../../repository";
import { toastError } from "../../../utils";

type UserDetails = {
  name: string;
  id_: string;
  ifscCode: string;
  email: string;
};

export function AddPage() {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: "",
    id_: "",
    ifscCode: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const {
    state: { pageNo },
  } = useAuthContext();
  const { addBank, getBankList } = useApi();
  let navigate = useNavigate();
  function validate() {
    if (!userDetails.name) {
      toastError("Name is required");
      return false;
    } else if (userDetails.id_.length < 30) {
      toastError("Invalid metamask address");
      return false;
    } else if (!userDetails.email.includes("@")) {
      toastError("Invalid email address");
      return false;
    } else if (userDetails.ifscCode.length < 11) {
      toastError("Invalid ifsc address");
      return false;
    }
    return true;
  }

  async function handleSubmitDetails() {
    try {
      setLoading(true);
      if (validate()) {
        await addBank({
          ...userDetails,
          status: 0,
          kycCount: "0",
        });
        setUserDetails({
          name: "",
          id_: "",
          ifscCode: "",
          email: "",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    listenToEvent();
  }, []);

  const listenToEvent = async () => {
    KycServices.eventContract.on(
      "BankAdded",
      async (id_: string, name: string, email: string, ifscCode: string) => {
        await getBankList(pageNo);
      }
    );
  };
  return (
    <Layout>
      <Center mt={["3", "16"]}>
        <Box mt={["5", "0"]} w={["90vw", "40vw"]}>
          <Heading color={"white"} mb="4" alignSelf={"flex-start"}>
            Add Insititution
          </Heading>
          <VStack bg="white" minH="50vh" borderRadius={10} p="10" space={5}>
            <ScreenHeader text={"Back"} route="/dashboard" />
            <FormControl w={["100%", "100%"]}>
              <FormControl.Label>
                <Text>Name</Text>
              </FormControl.Label>
              <Input
                onChangeText={(text) =>
                  setUserDetails((curr) => ({ ...curr, name: text }))
                }
                value={userDetails.name}
                color="blueGray.900"
                placeholder="John Doe"
                borderColor={"blueGray.900"}
              />
            </FormControl>
            <FormControl w={["100%", "100%"]}>
              <FormControl.Label>
                <Text>Email</Text>
              </FormControl.Label>
              <Input
                onChangeText={(text) =>
                  setUserDetails((curr) => ({ ...curr, email: text }))
                }
                value={userDetails.email}
                color="blueGray.900"
                placeholder="john@gmail.com"
                borderColor={"blueGray.900"}
              />
            </FormControl>
            <FormControl w={["100%", "100%"]}>
              <FormControl.Label>
                <Text>IFSC Code</Text>
              </FormControl.Label>
              <Input
                onChangeText={(text) =>
                  setUserDetails((curr) => ({ ...curr, ifscCode: text }))
                }
                value={userDetails.ifscCode}
                color="blueGray.900"
                placeholder="KKBK0001398"
                borderColor={"blueGray.900"}
              />
            </FormControl>
            <FormControl w={["100%", "100%"]}>
              <FormControl.Label>
                <Text>Metamask Address</Text>
              </FormControl.Label>
              <Input
                onChangeText={(text) =>
                  setUserDetails((curr) => ({ ...curr, id_: text }))
                }
                value={userDetails.id_}
                placeholder="0x2D8706E94E187c4E1806a8F5b4cxas5137460784D"
                color="blueGray.900"
                borderColor={"blueGray.900"}
              />
            </FormControl>

            {loading ? (
              <Button
                size="lg"
                mt="5"
                w="60%"
                borderWidth={2}
                isDisabled={true}
                variant={"outline"}
                alignSelf={"center"}
              >
                <HStack>
                  <Text mr="2">Adding</Text>
                  <Spinner accessibilityLabel="Loading posts" />
                </HStack>
              </Button>
            ) : (
              <Button
                size="lg"
                mt="5"
                w="60%"
                cursor={"pointer"}
                onPress={() => handleSubmitDetails()}
                borderWidth={2}
                variant={"outline"}
                alignSelf={"center"}
              >
                Add
              </Button>
            )}
          </VStack>
        </Box>
      </Center>
    </Layout>
  );
}
