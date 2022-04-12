import { Button, Center, Container, Heading, Text } from "native-base";
import { Link } from "react-router-dom";

export function ErrorPage() {
  return (
    <Container
      justifyContent="center"
      alignItems="center"
      height="100vh"
      maxWidth="100vw"
      width="container"
    >
      <Center>
        <Heading>
          {" "}
          <Text color="blue.600" mr="2" fontSize="4xl" bold>
            404
          </Text>{" "}
          Page Not Found
        </Heading>
        <Text fontSize="2xl" fontWeight="normal">
          Please check the url in the address bar and try again
        </Text>
        <Link to="/">
          <Button my="2" alignSelf="center">
            Go back Home
          </Button>
        </Link>
      </Center>
    </Container>
  );
}
