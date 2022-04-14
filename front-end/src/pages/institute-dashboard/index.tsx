import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
} from "native-base";
import { useEffect, useState } from "react";
import { CaseCount } from "../../components/case-count";
import { DetailsCard } from "./components/details-card";
import { DetailsHeader } from "./components/details-header";
import { Layout } from "../../components/layout";
import { SearchBox } from "../../components/search-box";
import { AddEntity } from "../../components/add-entity";
import { useApi } from "../../hooks/useApi";
import { useAuthContext } from "../../contexts/auth-context";
import { KycRequest, KycServices, KycStatus } from "../../repository";
import { useLocation, useNavigate } from "react-router-dom";
import { countCase, toastError } from "../../utils";
import { Pagination } from "../../components";

export const InstituteDashboard = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState<KycRequest>(
    {} as KycRequest
  );
  const [searchResultExist, setSearchResultExists] = useState<
    "yes" | "no" | "pending"
  >("pending");
  const {
    listLoading,
    searchCustomers,
    handlePaginationInstitute,
    getAllBankCustomerList,
  } = useApi();
  const {
    state: { data, totalPageNumber, fetchedData, pageNo },
  } = useAuthContext();
  const state = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    const { search } = state;
    search.length === 0 && navigate("/dashboard?page=1");
  }, []);

  useEffect(() => {
    const { search } = state;
    search.length !== 0 &&
      handlePaginationInstitute(
        +search.slice(-1),
        fetchedData,
        totalPageNumber
      );
  }, [state]);

  useEffect(() => {
    if (searchText === "") {
      setSearchResultExists("pending");
      setSearchResult({} as KycRequest);
    }
  }, [searchText]);

  const searchOperation = async () => {
    const re = /^0x[a-fA-F0-9]{40}$/;
    if (!re.test(searchText)) {
      toastError("invalid Metamask");
    } else {
      try {
        const res = await searchCustomers(searchText);
        if (res && res[0]) {
          setSearchResult(res[2]);
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
    listenAddKYCEvent();
    listenKYCReRequested();
    listenKYCStatusChanged();
  }, []);

  function listenAddKYCEvent() {
    KycServices.eventContract.on(
      "KycRequestAdded",
      async (
        reqId: string,
        bankName: string,
        customerName: string,
        event: any
      ) => {
        console.log("inside kyc added", reqId, event);
        await getAllBankCustomerList(pageNo);
      }
    );
  }

  function listenKYCReRequested() {
    KycServices.eventContract.on(
      "KycReRequested",
      async (reqId: string, bankName: string, customerName: string) => {
        console.log("here");
        await getAllBankCustomerList(pageNo);
      }
    );
  }
  function listenKYCStatusChanged() {
    KycServices.eventContract.on(
      "KycStatusChanged",
      async (
        reqId: string,
        bankName: string,
        customerName: string,
        status: KycStatus
      ) => {
        console.log("here");
        await getAllBankCustomerList(pageNo);
      }
    );
  }
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
            <CaseCount count={data.length} heading={"Registered Cases"} />
            <CaseCount
              count={countCase(data as KycRequest[]).rejected}
              heading={"Rejected Cases"}
            />
            <CaseCount
              count={countCase(data as KycRequest[]).approved}
              heading={"Approved Cases"}
            />
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
            <SearchBox
              searchText={searchText}
              setSearchText={setSearchText}
              searchOperation={searchOperation}
            />
          </HStack>
          <VStack alignItems={"center"} space={5}>
            <Box width={["90vw", "100%"]} overflow={["scroll", "unset"]}>
              <DetailsHeader />
              {listLoading ? (
                <Spinner size="lg" />
              ) : (
                <VStack flexDir={"column-reverse"}>
                  {searchResultExist === "pending" &&
                    (data.length === 0 ? (
                      <Center>
                        <Heading color="white" mb="4">
                          No Customers Found
                        </Heading>
                        <Button onPress={() => navigate("/dashboard/add")}>
                          Add one
                        </Button>
                      </Center>
                    ) : (
                      (data as KycRequest[]).map((item: KycRequest) => (
                        <DetailsCard item={item} />
                      ))
                    ))}
                </VStack>
              )}
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
