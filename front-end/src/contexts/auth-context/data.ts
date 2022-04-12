import { InitialStateType } from "./types";

export const initialState: InitialStateType = {
  userDetails: {
    address: "",
    type: "customer",
  },
  isUserLoggedIn: false,
  loading: false,
};
