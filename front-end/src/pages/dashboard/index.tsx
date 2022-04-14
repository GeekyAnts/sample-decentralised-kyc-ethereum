import { Box, HStack, Spinner, Text, VStack } from "native-base";
import { useEffect, useState } from "react";
import { Layout } from "../../components/layout";
import { CaseCount } from "../../components/case-count";
import { DetailsCard } from "./components/details-card";
import { DetailsHeader } from "./components/details-header";
import { SearchBox } from "../../components/search-box";
import { useApi } from "../../hooks/useApi";
import { useAuthContext } from "../../contexts/auth-context";
import { KycRequest, KycServices } from "../../repository";
import {
  countCase,
  countCaseCustomer,
  toastError,
  toastSuccess,
} from "../../utils";
import { useLocation, useNavigate } from "react-router-dom";
import { Pagination } from "../../components";

export const Dashboard = () => {
  const [searchResult, setSearchResult] = useState<KycRequest>(
    {} as KycRequest
  );
  const [searchResultExist, setSearchResultExists] = useState<
    "yes" | "no" | "pending"
  >("pending");
  const [searchText, setSearchText] = useState("");
  const {
    listLoading,
    searchBanks,
    handlePaginationCustomer,
    getBankKycRequests,
  } = useApi();
  const {
    state: { data, fetchedData, totalPageNumber, pageNo },
  } = useAuthContext();
  const state = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    if (searchText === "") {
      setSearchResultExists("pending");
      setSearchResult({} as KycRequest);
    }
  }, [searchText]);

  useEffect(() => {
    const { search } = state;
    search.length === 0 && navigate("/dashboard?page=1");
  }, []);

  useEffect(() => {
    const { search } = state;
    search.length !== 0 &&
      handlePaginationCustomer(+search.slice(-1), fetchedData, totalPageNumber);
  }, [state]);

  const searchOperation = async () => {
    const re = /^0x[a-fA-F0-9]{40}$/;
    if (!re.test(searchText)) {
      toastError("invalid Metamask");
    } else {
      try {
        const res = await searchBanks(searchText);

        if (res?.isBank) {
          setSearchResult(res.bankDetails);
          setSearchResultExists("yes");
        } else {
          setSearchResultExists("no");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    listenToEvent();
  }, []);

  const listenToEvent = async () => {
    KycServices.eventContract.on(
      "DataHashPermissionChanged",
      async (reqId, customerId, bankId, status) => {
        console.log("event", bankId);
        getBankKycRequests(pageNo);
        toastSuccess("Data permission changed successfully");
      }
    );
  };

  return (
    <Layout>
      <Box margin={7}>
        <VStack space={4} mb={8}>
          <Text
            textTransform={"capitalize"}
            fontWeight={"semibold"}
            fontSize={"lg"}
            color="white">
            My Dashboard
          </Text>
          <HStack space={10} flexDirection={["column", "row"]}>
            <CaseCount count={data.length} heading={"Registered Cases"} />
            <CaseCount
              count={countCaseCustomer(data as KycRequest[]).rejected}
              heading={"Rejected Cases"}
            />
            <CaseCount
              count={countCaseCustomer(data as KycRequest[]).approved}
              heading={"Approved Cases"}
            />
          </HStack>
        </VStack>
        <VStack>
          <HStack
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDirection={["column", "row"]}
            mb={5}>
            <Text
              textTransform={"capitalize"}
              fontWeight={"semibold"}
              fontSize={"lg"}
              color="white">
              My Individual Cases
            </Text>
            <SearchBox
              searchText={searchText}
              setSearchText={setSearchText}
              searchOperation={searchOperation}
            />
          </HStack>
          <VStack alignItems={"center"} space={5} width="100%">
            <Box width={["90vw", "100%"]} overflow={["scroll", "unset"]}>
              <DetailsHeader />
              {listLoading ? (
                <Spinner size="lg" />
              ) : (
                searchResultExist === "pending" &&
                ([...data].reverse() as KycRequest[]).map(
                  (item: KycRequest) => <DetailsCard item={item} />
                )
              )}
              ?
            </Box>

            {searchResultExist === "yes" && <DetailsCard item={searchResult} />}
            {searchResultExist === "no" && <Text>Bank Dose not exist</Text>}
          </VStack>
        </VStack>
      </Box>
      <Pagination />
    </Layout>
  );
};
