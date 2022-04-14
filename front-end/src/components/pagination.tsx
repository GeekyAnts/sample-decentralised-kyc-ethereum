import { Button, HStack, IconButton, Text } from "native-base";
import { CgEditBlackPoint } from "react-icons/cg";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/auth-context";
import { useApi } from "../hooks/useApi";

export function Pagination() {
  const {
    state: { pageNo, totalPageNumber },
  } = useAuthContext();
  const { listLoading } = useApi();
  const navigate = useNavigate();
  if (listLoading) {
    return <></>;
  }
  return totalPageNumber <= 1 ? (
    <></>
  ) : (
    <HStack justifyContent={"space-between"} w="100%" alignItems={"center"}>
      <HStack alignItems={"center"}>
        <CgEditBlackPoint color="white" />
        <Text ml="2" color="white">
          {`Page ${pageNo} of ${totalPageNumber} pages`}
        </Text>
      </HStack>
      <HStack>
        {pageNo !== 1 && (
          <IconButton
            variant={"ghost"}
            color="white"
            icon={<MdOutlineArrowBackIos />}
            onPress={() => navigate(`/dashboard?page=${pageNo - 1}`)}
          />
        )}
        <HStack w="80px" justifyContent={"space-evenly"} mx="2">
          <Button h="35px">{pageNo}</Button>
        </HStack>
        {pageNo < totalPageNumber && (
          <IconButton
            onPress={() => navigate(`/dashboard?page=${pageNo + 1}`)}
            variant={"ghost"}
            color="white"
            icon={<MdOutlineArrowForwardIos />}
          />
        )}
      </HStack>
    </HStack>
  );
}
