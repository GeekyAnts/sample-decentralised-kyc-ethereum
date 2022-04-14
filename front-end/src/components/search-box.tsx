import { Input } from "native-base";
import { AiOutlineSearch } from "react-icons/ai";

export const SearchBox = ({
  setSearchText,
  searchText,
  searchOperation,
}: {
  setSearchText: (arg0: string) => void;
  searchText: string;
  searchOperation: Function;
}) => {
  return (
    <Input
      variant="underlined"
      placeholder="Search cases"
      width={["300", "400px"]}
      value={searchText}
      onChangeText={setSearchText}
      fontSize={"md"}
      color={"white"}
      InputRightElement={
        <AiOutlineSearch
          onClick={() => searchOperation()}
          color="white"
          cursor={"pointer"}
          size={30}
        />
      }
      borderColor="yellow.400"
    />
  );
};
