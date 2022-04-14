import { Bank, Customer, KycRequest, User } from "../../../repository";
import { AUTH } from "../action-types";

export function setLoginStatus(payload: boolean) {
  return {
    type: AUTH.SET_LOGIN_STATUS,
    payload,
  };
}

export function setLoading(payload: boolean) {
  return {
    type: AUTH.SET_LOADING,
    payload,
  };
}

export function setUserDetails(payload: User) {
  return {
    type: AUTH.SET_USER_DETAILS,
    payload,
  };
}

export function setData(payload: {
  data: (Customer | Bank | User | KycRequest)[];
  totalPages: number;
  currentPage: number;
}) {
  return {
    type: AUTH.SET_DATA,
    payload,
  };
}

export function setFetchedData(payload: {
  pageNo: string;
  data: (Customer | Bank | User | KycRequest)[];
}) {
  return {
    type: AUTH.SET_FETCHED_DATA,
    payload,
  };
}

export function kycRequestStatus() {
  return {
    type: AUTH.SET_KYC_REQUEST,
  };
}

export function resetStates() {
  return {
    type: AUTH.RESET,
  };
}
