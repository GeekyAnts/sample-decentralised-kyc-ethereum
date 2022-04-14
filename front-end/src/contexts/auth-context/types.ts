import { Bank, Customer, KycRequest, User } from "../../repository";
import { AUTH } from "./action-types";

export type FetchedDataType = {
  [key: string]: (Customer | Bank | User | KycRequest)[];
};
export type InitialStateType = {
  userDetails: User;
  isUserLoggedIn: boolean;
  loading: boolean;
  pageNo: number;
  totalPageNumber: number;
  data: (Customer | Bank | User | KycRequest)[];
  fetchedData: FetchedDataType;
};

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthPayload = {
  [AUTH.SET_USER_DETAILS]: User;
  [AUTH.SET_LOGIN_STATUS]: boolean;
  [AUTH.SET_LOADING]: boolean;
  [AUTH.SET_DATA]: {
    data: (Customer | Bank | User | KycRequest)[];
    totalPages: number;
    currentPage: number;
  };
  [AUTH.SET_FETCHED_DATA]: {
    pageNo: string;
    data: (Customer | Bank | User | KycRequest)[];
  };
  [AUTH.RESET]: any;
};

export type AuthActions = ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>];
