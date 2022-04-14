import {
  Box,
  HStack,
  Spinner,
  Text,
  VStack,
  Heading,
  Center,
  Button,
} from "native-base";
import { useEffect } from "react";
import { CaseCount } from "../../components/case-count";
import { DetailsCard } from "./components/details-card";
import { DetailsHeader } from "./components/details-header";
import { Layout } from "../../components/layout";
import { AddEntity } from "../../components/add-entity";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/style.css";
import { useApi } from "../../hooks/useApi";
import { useAuthContext } from "../../contexts/auth-context";
import { Bank, KycServices } from "../../repository";
import { countCaseAdmin } from "../../utils";
import { Pagination } from "../../components";

export const AdminDashboard = () => {
  const {
    state: { data, fetchedData, totalPageNumber, pageNo },
  } = useAuthContext();
  const { listLoading, handlePaginationAdmin, getBankList } = useApi();
  const state = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    const { search } = state;
    search.length === 0 && navigate("/dashboard?page=1");
  }, []);

  useEffect(() => {
    const { search } = state;
    search.length !== 0 &&
      handlePaginationAdmin(+search.slice(-1), fetchedData, totalPageNumber);
  }, [state]);
  
  useEffect(() => {
    listenToggleActivateEvent();
    listenToggleDeActivateEvent();
    listenEditEvent();
  }, []);

  const listenEditEvent = async () => {
    KycServices.eventContract.on(
      "BankUpdated",
      async (id_: string, name: string, email: string) => {
        await getBankList(pageNo);
      }
    );
  };
  const listenToggleActivateEvent = async () => {
    KycServices.eventContract.on(
      "BankActivated",
      async (id_: string, name: string) => {
        await getBankList(pageNo);
      }
    );
  };
  const listenToggleDeActivateEvent = async () => {
    KycServices.eventContract.on(
      "BankDeactivated",
      async (id_: string, name: string) => {
        await getBankList(pageNo);
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
            color={"white"}
            fontSize={"lg"}
          >
            My Dashboard
          </Text>
          <HStack space={10} flexDirection={["column", "row"]}>
            <CaseCount count={data.length} heading={"Total Institutions"} />
            <CaseCount
              count={countCaseAdmin(data as Bank[]).inActive}
              heading={"Inactive Institutions"}
            />
            <CaseCount
              count={countCaseAdmin(data as Bank[]).active}
              heading={"Active Institutions"}
            />
            <AddEntity entity="Institution" route="/dashboard/add" />
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
              color={"white"}
              textTransform={"capitalize"}
              fontWeight={"semibold"}
              fontSize={"lg"}
            >
              My Individual Cases
            </Text>
          </HStack>
          <VStack alignItems={"center"} space={5}>
            <Box width={["90vw", "100%"]} overflow={["scroll", "unset"]}>
              <DetailsHeader />
              {listLoading ? (
                <Spinner size="lg" />
              ) : (
                <VStack flexDir={"column-reverse"}>
                  {data.length === 0 ? (
                    <Center>
                      <Heading color="white" mb="4">
                        No Bank Found
                      </Heading>
                      <Button onPress={() => navigate("/dashboard/add")}>
                        Add one
                      </Button>
                    </Center>
                  ) : (
                    (data as Bank[]).map((item: Bank) => (
                      <DetailsCard item={item} />
                    ))
                  )}
                </VStack>
              )}
            </Box>
          </VStack>
        </VStack>
      </Box>
      <Pagination />
    </Layout>
  );
};
