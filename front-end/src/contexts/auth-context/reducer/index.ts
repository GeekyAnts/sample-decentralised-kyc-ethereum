import { AUTH } from "../action-types";
import { initialState } from "../data";
import { AuthActions, InitialStateType } from "../types";

export function authReducer(
  state: InitialStateType = initialState,
  action: AuthActions
) {
  switch (action.type) {
    case AUTH.SET_LOGIN_STATUS:
      return { ...state, isUserLoggedIn: action.payload };

    case AUTH.SET_LOADING:
      return { ...state, loading: action.payload };

    case AUTH.SET_USER_DETAILS:
      return {
        ...state,
        userDetails: { ...action.payload },
      };

    case AUTH.RESET:
      return initialState;

    default:
      return state;
  }
}
export default authReducer;
