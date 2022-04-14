import { InitialStateType } from "./types";

export const initialState: InitialStateType = {
  userDetails: {
    status: 1,
    role: 0,
    email: "",
    id_: "",
    name: "",
  },
  isUserLoggedIn: false,
  loading: false,
  pageNo: 1,
  totalPageNumber: 1,
  data: [],
  fetchedData: {},
};

