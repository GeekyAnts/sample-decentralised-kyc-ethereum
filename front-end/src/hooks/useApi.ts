import { useCallback, useState } from "react";
import {
  setData,
  setFetchedData,
  useAuthContext,
} from "../contexts/auth-context";
import { FetchedDataType } from "../contexts/auth-context/types";
import { Bank, BankStatus, Customer, KycServices, User } from "../repository";
import { toastError, toastSuccess } from "../utils";

const rejectErrorCheck = (error: any) =>
  error.message.includes("User denied transaction signature");

export function useApi() {
  const { dispatch } = useAuthContext();
  const apiInstance = KycServices.getInstance();
  const [listLoading, setListLoading] = useState(false);
  const getBankList = useCallback(async (currentPage: number) => {
    try {
      setListLoading(true);
      const res = await apiInstance.getAllBanks(currentPage);
      const data = res[1].filter((i) => ({ ...i }));
      dispatch(setData({ data, totalPages: +res[0].toString(), currentPage }));
      dispatch(setFetchedData({ pageNo: currentPage + "", data }));
    } catch (error) {
      console.log(error);
      toastError("Error while fetching bank list");
    } finally {
      setListLoading(false);
    }
  }, []);
  const addBank = useCallback(async (details: Bank) => {
    try {
      const data = await apiInstance.addBank(details);
      toastSuccess("Bank added successfully, it will reflect in few minutes!");
      return data;
    } catch (error) {
      console.log(error);
      if (rejectErrorCheck(error)) {
        toastError("User has rejected the action");
      } else {
        toastError("Error while adding bank, please try again later!");
      }
    }
  }, []);
  const updateBankDetails = useCallback(
    async (updatedDetails: { id: string; email: string; name: string }) => {
      try {
        const data = await apiInstance.updateBankDetails(updatedDetails);
        toastSuccess(
          "Updated the data successfully, it'll take few minutes to update here!"
        );
        return data;
      } catch (error) {
        console.log(error);
        if (rejectErrorCheck(error)) {
          toastError("User has rejected the action");
        } else {
          toastError("Error while updating bank details, please try again!");
        }
      }
    },
    []
  );
  const toggleBankStatus = useCallback(async (id: string, status: boolean) => {
    try {
      const data = await apiInstance.activateDeactivateBank(id, status);
      toastSuccess(
        `Bank Status is been changed to ${
          status ? "active" : "inactive"
        } , It will reflect in a minute! `
      );
      return data;
    } catch (error) {
      console.log(error);
      if (rejectErrorCheck(error)) {
        toastError("User has rejected the action");
      } else {
        toastError("Error while switching bank statusm Please try later!");
      }
    }
  }, []);

  // bank functions

  const getAllBankCustomerList = useCallback(async (currentPage: number) => {
    try {
      setListLoading(true);
      const res = await apiInstance.getCustomersOfBank(currentPage);
      console.log(res);
      dispatch(
        setData({
          data: res[1],
          totalPages: +res[0].toString(),
          currentPage: 1,
        })
      );
      dispatch(setFetchedData({ pageNo: currentPage + "", data: res[1] }));
    } catch (error) {
      console.log(error);
      toastError("Error while fetching customers of bank list");
    } finally {
      setListLoading(false);
    }
  }, []);

  const getCustomerDetails = useCallback(async (id: string) => {
    try {
      const data = await apiInstance.getCustomerDetails(id);
      return data;
    } catch (error) {
      console.log(error);
      toastError("Error while fetching customers details");
    }
  }, []);

  const addKycRequest = useCallback(
    async (data: { customer: Customer; time: number; notes: string }) => {
      try {
        const res = await apiInstance.addKycRequest(
          data.customer,
          data.time,
          data.notes
        );
        toastSuccess(
          "Kyc Request added succesfully, wait for few minutes to see the changes!"
        );
        return res;
      } catch (error: any) {
        console.log(error);
        if (rejectErrorCheck(error)) {
          toastError("User has rejected the action");
        } else {
          toastError("Error while requesting KYC, please try again!");
        }
      }
    },
    []
  );

  const reRequestForKycRequest = useCallback(
    async (id: string, notes: string) => {
      try {
        const res = await apiInstance.reRequestForKycRequest(id, notes);
        toastSuccess(
          "KYC requested again successfully, wait for few minutes to see the results"
        );
        return res;
      } catch (error) {
        console.log(error);
        if (rejectErrorCheck(error)) {
          toastError("User has rejected the action");
        } else {
          toastError("Error while requesting KYC, please try again!");
        }
      }
    },
    []
  );
  const updateKycVerification = useCallback(
    async (data: { id: string; notes: string; isVerified: boolean }) => {
      try {
        const res = await apiInstance.updateKycVerification(data);
        toastSuccess(
          `KYC request ${
            data.isVerified ? "verified" : "rejected"
          } successfully, wait for few minutes to see the results`
        );
        return res;
      } catch (error) {
        console.log(error);
        if (rejectErrorCheck(error)) {
          toastError("User has rejected the action");
        } else {
          toastError("Error while requesting KYC, please try again!");
        }
      }
    },
    []
  );
  const searchCustomers = useCallback(async (id: string) => {
    try {
      const res = await apiInstance.searchCustomers(id);
      return res;
    } catch (error) {
      console.log(error);
      toastError("Error while searching customer");
    }
  }, []);

  // customer functions

  const getBankKycRequests = useCallback(async (currentPage: number) => {
    try {
      console.log("bank list request");
      setListLoading(true);
      const res = await apiInstance.getBankRequests(currentPage);
      const data = res[1];
      dispatch(setData({ data, totalPages: +res[0].toString(), currentPage }));
      dispatch(setFetchedData({ pageNo: currentPage + "", data }));
    } catch (error) {
      console.log(error);
      toastError("Error while fetching customers of bank list");
    } finally {
      setListLoading(false);
    }
  }, []);

  const actionOnKycRequest = useCallback(
    async (bankId: string, isApproved: boolean, notes: string) => {
      console.log(isApproved, "approval status");
      try {
        const res = await apiInstance.actionOnKycRequest(
          bankId,
          isApproved,
          notes
        );
        console.log(res);
        toastSuccess(
          "Data permission given to bank, Changes will reflect shortly"
        );
        return res;
      } catch (error: any) {
        console.log(error);
        if (error.message.includes("Bank is not active")) {
          toastError("Bank is inactive");
        } else if (rejectErrorCheck(error)) {
          toastError("User has rejected the action");
        } else {
          toastError("data permission action failed");
        }
      }
    },
    []
  );

  const updateProfile = useCallback(
    async (name: string, email: string, number: string) => {
      try {
        const res = await apiInstance.updateProfile(name, email, number);
        toastSuccess(
          "Profile updated succeffully,changes will be reflected shortly"
        );
        return res;
      } catch (error) {
        console.log(error);
        if (rejectErrorCheck(error)) {
          toastError("User has rejected the action");
        } else {
          toastError("Failed to update profile");
        }
      }
    },
    []
  );

  const updateDatahash = useCallback(async (hash: string) => {
    try {
      const res = await apiInstance.updateDatahash(hash);
      toastSuccess("Data hash has been updated, changes will reflect shortly");
      return res;
    } catch (error) {
      console.log(error);
      if (rejectErrorCheck(error)) {
        toastError("User has rejected the action");
      } else {
        toastError("Error while updating data hash, please try again!");
      }
    }
  }, []);

  const removerDatahashPermission = useCallback(
    async (id: string, notes: string) => {
      try {
        const res = await apiInstance.removerDatahashPermission(id, notes);
        console.log(res);
        toastSuccess(
          "Data permission has been revoked, Changes will reflect shortly"
        );
        return res;
      } catch (error) {
        console.log(error);
        if (rejectErrorCheck(error)) {
          toastError("User has rejected the action");
        } else {
          toastError("Failed to revoke data hash permission");
        }
      }
    },
    []
  );

  const searchBanks = useCallback(async (id: string) => {
    try {
      const res = await apiInstance.searchBanks(id);
      const formatedData = { isBank: res[1], bankDetails: res[2] };
      return formatedData;
    } catch (error: any) {
      console.log(error);
      if (error.message.includes("Bank is not active")) {
        toastError("Bank is inactive");
      } else {
        toastError("Something went wrong, search operation failed");
      }
    }
  }, []);

  const getUserDetails = useCallback(async (): Promise<User | undefined> => {
    try {
      const res = await apiInstance.getUserInfo();
      console.log(res);
      if (res.status === BankStatus.Inactive) {
        throw "Bank is inactive";
      }
      return res;
    } catch (error) {
      console.log(error);
      if (error === "Bank is inactive") {
        toastError("Bank is inactive");
      } else {
        toastError("Failed to authenticate the metamask user!");
      }
    }
  }, []);

  const getBankDetail = useCallback(async (id: string) => {
    try {
      const res = await apiInstance.getBankDetails(id);
      return res;
    } catch (error) {
      throw error;
    }
  }, []);

  const handlePaginationAdmin = useCallback(
    async (
      pageNo: number,
      fetchedData: FetchedDataType,
      totalPageNumber: number
    ) => {
      if (!fetchedData[pageNo]) {
        try {
          setListLoading(true);
          const res = await apiInstance.getAllBanks(pageNo);
          const nextData = res[1].map((i) => ({ ...i }));
          dispatch(setFetchedData({ pageNo: pageNo + "", data: nextData }));
          dispatch(
            setData({
              data: nextData,
              totalPages: +res[0].toString(),
              currentPage: pageNo,
            })
          );
        } catch (error: any) {
          console.log(error);
          toastError(
            error.message.includes("Bank is not active")
              ? "Bank is deactivated by admin, contact us for more info."
              : "Error while fetching bank list"
          );
        } finally {
          setListLoading(false);
        }
      } else {
        if (fetchedData[pageNo].length !== 0) {
          dispatch(
            setData({
              data: fetchedData[pageNo],
              totalPages: totalPageNumber,
              currentPage: pageNo,
            })
          );
        }
      }
    },
    []
  );

  const handlePaginationInstitute = useCallback(
    async (
      pageNo: number,
      fetchedData: FetchedDataType,
      totalPageNumber: number
    ) => {
      if (!fetchedData[pageNo]) {
        try {
          setListLoading(true);
          const res = await apiInstance.getCustomersOfBank(pageNo);
          dispatch(setFetchedData({ pageNo: pageNo + "", data: res[1] }));
          dispatch(
            setData({
              data: res[1],
              totalPages: +res[0].toString(),
              currentPage: pageNo,
            })
          );
        } catch (error) {
          console.log(error);
          toastError("Error while fetching customers data");
        } finally {
          setListLoading(false);
        }
      } else {
        if (fetchedData[pageNo].length !== 0) {
          dispatch(
            setData({
              data: fetchedData[pageNo],
              totalPages: totalPageNumber,
              currentPage: pageNo,
            })
          );
        }
      }
    },
    []
  );

  const handlePaginationCustomer = useCallback(
    async (
      pageNo: number,
      fetchedData: FetchedDataType,
      totalPageNumber: number
    ) => {
      if (!fetchedData[pageNo]) {
        try {
          setListLoading(true);
          const res = await apiInstance.getBankRequests(pageNo);
          dispatch(setFetchedData({ pageNo: pageNo + "", data: res[1] }));
          dispatch(
            setData({
              data: res[1],
              totalPages: +res[0].toString(),
              currentPage: pageNo,
            })
          );
        } catch (error) {
          console.log(error);
          toastError("Error while fetching Kyc requests");
        } finally {
          setListLoading(false);
        }
      } else {
        if (fetchedData[pageNo].length !== 0) {
          dispatch(
            setData({
              data: fetchedData[pageNo],
              totalPages: totalPageNumber,
              currentPage: pageNo,
            })
          );
        }
      }
    },
    []
  );
  return {
    getBankList,
    getAllBankCustomerList,
    getBankKycRequests,
    getBankDetail,
    addBank,
    updateBankDetails,
    toggleBankStatus,
    getCustomerDetails,
    addKycRequest,
    reRequestForKycRequest,
    updateKycVerification,
    searchCustomers,
    actionOnKycRequest,
    updateProfile,
    updateDatahash,
    removerDatahashPermission,
    searchBanks,
    getUserDetails,
    handlePaginationAdmin,
    handlePaginationInstitute,
    handlePaginationCustomer,
    listLoading,
  };
}
