import React, { createContext, useContext, useReducer } from "react";
import { authReducer } from "./reducer";
import { initialState } from "./data";
import { InitialStateType } from "./types";

const AuthContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
