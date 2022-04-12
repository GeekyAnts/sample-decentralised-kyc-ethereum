import { AUTH } from "../action-types";
import { UserDetails } from "../types";

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

export function setUserDetails(payload: UserDetails) {
  return {
    type: AUTH.SET_USER_DETAILS,
    payload,
  };
}

export function resetStates() {
  return {
    type: AUTH.RESET,
  };
}
