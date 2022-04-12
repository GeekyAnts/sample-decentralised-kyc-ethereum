import { Button, Heading, HStack, Image, Text, VStack } from "native-base";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components";
import { useAuthContext } from "../../contexts/auth-context";
import { useAuth } from "../../hooks/useAuth";

export function LandingPage() {
  let navigate = useNavigate();
  const {
    state: { isUserLoggedIn },
  } = useAuthContext();
  const { connect, getAccounts } = useAuth();

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <Layout>
      <HStack
        flexDir={["column", "row"]}
        maxW="100vw"
        justifyContent={"space-between"}
        alignItems="center">
        <VStack
          w={["90%", "40%"]}
          ml={["0", "40"]}
          mt={["10", "0"]}
          alignItems={"flex-start"}>
          <Heading
            color="white"
            fontSize={["2xl", "4xl"]}
            mb="4"
            fontWeight={"medium"}>
            A global turn-key compliance solution
          </Heading>
          <Text color="coolGray.300" fontSize={["sm", "lg"]} w="80%">
            An all-in-one workflow solution to verify your customers'
            identities, streamline a KYC on-boarding process and manage the
            entire customer lifecycle.
          </Text>
          <Button
            size="lg"
            colorScheme="danger"
            w="150"
            mt="5"
            onPress={() =>
              isUserLoggedIn ? navigate("/dashboard") : connect()
            }>
            Dashboard
          </Button>
        </VStack>
        <Image
          source={{
            uri: "https://kyc-chain.com/wp-content/uploads/2019/07/Mackbook.png",
          }}
          alignSelf={"flex-end"}
          resizeMode="contain"
          size={["55vh", "80vh"]}
          alt="laptop"></Image>
      </HStack>
    </Layout>
  );
}
