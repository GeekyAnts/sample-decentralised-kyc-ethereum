import { HStack, Link } from "native-base";
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import "./style.css";

export function Footer() {
  return (
    <HStack
      p={4}
      alignItems="center"
      flexDirection={{ base: "column", md: "row" }}
      justifyContent="space-between"
    >
      <HStack space={3} justifyContent={{ base: "center" }}>
        <Link
          textDecorationLine="none"
          _text={{
            color: "danger.500",
            fontWeight: "medium",
            fontSize: "xs",
          }}
        >
          Terms and conditions
        </Link>
        <Link
          _text={{
            color: "danger.500",
            fontWeight: "medium",
            fontSize: "xs",
          }}
          textDecorationLine="none"
        >
          Privacy Policy
        </Link>
      </HStack>
      <HStack
        space={3}
        justifyContent={{ base: "center" }}
        paddingTop={{ base: "3" }}
      >
        <BsFacebook color="white" size={25} className="logo-scale" />
        <BsInstagram color="white" size={25} className="logo-scale" />
        <BsTwitter color="white" size={30} className="logo-scale" />
        <BsYoutube
          color="white"
          size={30}
          cursor="pointer"
          className="logo-scale"
        />
      </HStack>
    </HStack>
  );
}
