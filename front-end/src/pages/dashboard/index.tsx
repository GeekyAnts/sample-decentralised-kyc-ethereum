import { Box, HStack, Text, VStack } from "native-base";
import { useState } from "react";

import { Layout } from "../../components/layout";
import { CaseCount } from "../../components/case-count";
import { DetailsCard } from "./components/details-card";
import { DetailsHeader } from "./components/details-header";
import { SearchBox } from "../../components/search-box";

const data = [
  {
    bank_name: "ICICI bank limited",
    status: "pending",
    date: "1647862405",
    address: "0xd034739c2ae807c70cd703092b946f62a49509d1",
  },
  {
    bank_name: "HDFC Bank Limited",
    status: "approved",
    date: "1647862507",
    address: "0xd034739c2ae807c70cd703092b946f62a49509d1",
  },
  {
    bank_name: "Axis Bank Limited",
    status: "rejected",
    date: "1647862521",
    address: "0xd034739c2ae807c70cd703092b946f62a49509d1",
  },
];

export const Dashboard = () => {
  const [searchText, setSearchText] = useState("");

  const filterBySearch = (data: any) => {
    let searchData;
    if (searchText === "") {
      return data;
    } else {
      searchData = data.filter(
        (items: any) =>
          items.bank_name &&
          items?.bank_name.toLowerCase().includes(searchText.toLowerCase())
      );
      return searchData;
    }
  };

  return (
    <Layout>
      <Box margin={7}>
        <VStack space={4} mb={8}>
          <Text
            textTransform={"capitalize"}
            fontWeight={"semibold"}
            fontSize={"lg"}
            color="white"
          >
            My Dashboard
          </Text>
          <HStack space={10} flexDirection={["column", "row"]}>
            <CaseCount count={284} heading={"Registered Cases"} />
            <CaseCount count={192} heading={"Rejected Cases"} />
            <CaseCount count={16} heading={"Approved Cases"} />
          </HStack>
        </VStack>
        <VStack>
          <HStack
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDirection={["column", "row"]}
            mb={5}
          >
            <Text
              textTransform={"capitalize"}
              fontWeight={"semibold"}
              fontSize={"lg"}
              color="white"
            >
              My Individual Cases
            </Text>
            <SearchBox searchText={searchText} setSearchText={setSearchText} />
          </HStack>
          <VStack alignItems={"center"} space={5} width="100%">
            <Box width={["90vw", "100%"]} overflow={["scroll", "unset"]}>
              <DetailsHeader />
              {filterBySearch(data).map((item: any) => (
                <DetailsCard item={item} />
              ))}
            </Box>

            {searchText !== "" && filterBySearch(data).length === 0 && (
              <Text color={"white"}>No Results Found</Text>
            )}
          </VStack>
        </VStack>
      </Box>
    </Layout>
  );
};
