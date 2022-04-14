import { AUTH } from "../action-types";
import { initialState } from "../data";
import { AuthActions, InitialStateType } from "../types";

export function authReducer(
  state: InitialStateType,
  action: AuthActions
): InitialStateType {
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

    case AUTH.SET_DATA:
      const { data, totalPages, currentPage } = action.payload;
      return {
        ...state,
        data,
        totalPageNumber: totalPages,
        pageNo: currentPage,
      };

    case AUTH.SET_FETCHED_DATA:
      const { data: fetchedData, pageNo } = action.payload;
      return {
        ...state,
        fetchedData: {
          ...state.fetchedData,
          [pageNo]: fetchedData,
        },
      };

    case AUTH.RESET:
      return initialState;

    default:
      return state;
  }
}
export default authReducer;
