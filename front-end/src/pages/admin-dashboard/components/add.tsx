import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  Text,
  VStack,
} from "native-base";
import { useEffect, useState } from "react";

import { Layout } from "../../../components";
import { ScreenHeader } from "../../../components/screen-header";
import { useAuth } from "../../../hooks/useAuth";
import { toastError } from "../../../utils";

type UserDetails = {
  name: string;
  address: string;
};

export function AddPage() {
  const [userDetails, setUserDetails] = useState<UserDetails>(
    {} as UserDetails
  );

  function validate() {
    const re = /^0x[a-fA-F0-9]{40}$/;
    if (!userDetails.name) {
      toastError("Name is required");
      return false;
    } else if (!re.test(userDetails.address)) {
      toastError("Invalid metamask address");
      return false;
    }
    return true;
  }

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
                <Text>Metamask Address</Text>
              </FormControl.Label>
              <Input
                onChangeText={(text) =>
                  setUserDetails((curr) => ({ ...curr, address: text }))
                }
                value={userDetails.address}
                placeholder="0x2D8706E94E187c4E1806a8F5b4cxas5137460784D"
                color="blueGray.900"
                borderColor={"blueGray.900"}
              />
            </FormControl>

            <Button
              size="lg"
              mt="5"
              w="60%"
              cursor={"pointer"}
              onPress={() => validate()}
              borderWidth={2}
              variant={"outline"}
              alignSelf={"center"}>
              Add
            </Button>
          </VStack>
        </Box>
      </Center>
    </Layout>
  );
}
