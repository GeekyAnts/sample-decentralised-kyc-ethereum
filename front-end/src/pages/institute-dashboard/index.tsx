import { Box, Button, HStack, Text, VStack } from "native-base";
import { useState } from "react";
import { CaseCount } from "../../components/case-count";
import { DetailsCard } from "./components/details-card";
import { DetailsHeader } from "./components/details-header";
import { Layout } from "../../components/layout";
import { SearchBox } from "../../components/search-box";
import { AddEntity } from "../../components/add-entity";
import { useNavigate } from "react-router-dom";

const data = [
  {
    bank_name: "Joyan Serrao",
    status: "pending",
    date: "1647862405",
    address: "0xd034739c2ae807c70cd703092b946f62a49509d1",
  },
  {
    bank_name: "Virat Kholi",
    status: "approved",
    date: "1647862507",
    address: "0xd034739c2ae807c70cd703092b946f62a49509d1",
  },
  {
    bank_name: "Sachin Tendulkar",
    status: "rejected",
    date: "1647862521",
    address: "0xd034739c2ae807c70cd703092b946f62a49509d1",
  },
];

export const InstituteDashboard = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

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
            color={"white"}
            fontSize={"lg"}
          >
            My Dashboard
          </Text>
          <HStack space={10} flexDirection={["column", "row"]}>
            <CaseCount count={284} heading={"Registered Customers"} />
            <CaseCount count={192} heading={"Rejected Customers"} />
            <CaseCount count={16} heading={"Approved Customers"} />
            <AddEntity entity="Customer" route="/dashboard/add" />
          </HStack>
        </VStack>
        <VStack>
          <HStack
            flexDirection={["column", "row"]}
            alignItems={"center"}
            justifyContent={"space-between"}
            mb={5}
          >
            <Text
              mb={[2]}
              textTransform={"capitalize"}
              fontWeight={"semibold"}
              color={"white"}
              fontSize={"lg"}
            >
              My Individual Cases
            </Text>
            <SearchBox searchText={searchText} setSearchText={setSearchText} />
          </HStack>
          <VStack alignItems={"center"} space={5}>
            <Box width={["90vw", "100%"]} overflow={["scroll", "unset"]}>
              <DetailsHeader />
              {filterBySearch(data).map((item: any) => (
                <DetailsCard item={item} />
              ))}
              {searchText !== "" && filterBySearch(data).length === 0 && (
                <Button
                  onPress={() => navigate("/dashboard/add")}
                  mx="auto"
                  maxWidth={"200px"}
                  bgColor="orange.400"
                  _hover={{ bgColor: "orange.300" }}
                >
                  Add Customer
                </Button>
              )}
            </Box>
          </VStack>
        </VStack>
      </Box>
    </Layout>
  );
};
