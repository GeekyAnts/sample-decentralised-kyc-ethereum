import { IconButton, VStack } from "native-base";
import { Links } from "./links";
import { IoCloseSharp } from "react-icons/io5";

export function MobileNav({ setShowMenu }: { setShowMenu: Function }) {
  return (
    <VStack
      bg="blueGray.800"
      position={"fixed"}
      h="100vh"
      display={["flex","none"]}
      zIndex={20}
      w="100vw"
      top={0}
      left={0}
      justifyContent={"center"}
      alignItems="center"
    >
      <IconButton
        position={"absolute"}
        top="5"
        right="2"
        p="0"
        mt="1.5"
        ml="3"
        onPress={() => setShowMenu(false)}
        icon={<IoCloseSharp style={{ color: "#fff" }} size="30" />}
      />
      <Links />
    </VStack>
  );
}
