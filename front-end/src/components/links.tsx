import { Button, HStack, Link, Text } from "native-base";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/auth-context";
import { truncateString } from "../utils";
import { useAuth } from "../hooks/useAuth";

export function Links() {
  const navigate = useNavigate();
  const {
    state: {
      userDetails: { address },
      isUserLoggedIn,
    },
  } = useAuthContext();
  const { connect } = useAuth();
  return (
    <HStack
      flexDir={["column", "row"]}
      space={"5"}
      alignItems={"center"}
      mr="5"
    >
      <NavLink
        className={(navData) => (navData.isActive ? "link-active" : "link")}
        to="/dashboard"
      >
        <Text color="white" fontSize="lg">
          Dashboard
        </Text>
      </NavLink>
      <Link
        mx="4"
        my={["4", "0"]}
        isExternal
        href="https://blog.geekyants.com/"
        isUnderlined={false}
      >
        <Text color="white" fontSize="lg">
          Contact Us
        </Text>
      </Link>
      <Link
        isExternal
        href="https://geekyants.com/#footer"
        isUnderlined={false}
      >
        <Text color="white" mr={["0", "5"]} fontSize="lg">
          Blog
        </Text>
      </Link>
      <Button
        _hover={{ bg: "white", color: "primary.500" }}
        size="lg"
        mt={["5", "0"]}
        onPress={() => (isUserLoggedIn ? navigate("/profile") : connect())}
        variant={"outline"}
      >
        {isUserLoggedIn ? truncateString(address) : "Connect"}
      </Button>
    </HStack>
  );
}
