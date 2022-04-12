import { AUTH } from "./action-types";

export type UserType = "customer" | "admin" | "institution";

export type UserDetails = {
  address: string;
  type: UserType;
};

export type InitialStateType = {
  userDetails: UserDetails;
  isUserLoggedIn: boolean;
  loading: boolean;
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
  [AUTH.SET_USER_DETAILS]: UserDetails;
  [AUTH.SET_LOGIN_STATUS]: boolean;
  [AUTH.SET_LOADING]: boolean;
  [AUTH.RESET]: any;
};

export type AuthActions = ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>];
