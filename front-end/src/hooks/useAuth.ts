import { useCallback } from "react";
import { toastError } from "../utils";
import Web3 from "web3";
import {
  resetStates,
  setUserDetails,
  setLoginStatus,
  useAuthContext,
  setLoading,
} from "../contexts/auth-context";
import { useLocation, useNavigate } from "react-router-dom";
import { useApi } from "./useApi";
let web3: Web3 | undefined = undefined;

export function useAuth() {
  const { dispatch } = useAuthContext();
  let navigate = useNavigate();
  const state = useLocation();
  const { getUserDetails } = useApi();
  const connect = useCallback(async function handleLogin() {
    try {
      if (!(window as any).ethereum) {
        toastError("Please install MetaMask first.");
        return;
      }
      if (!web3) {
        try {
          await (window as any).ethereum.enable();
          web3 = new Web3((window as any).ethereum);
        } catch (error) {
          toastError("You need to allow MetaMask.");
          return;
        }
      }
      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length !== 0) {
        console.log("Connected", accounts[0]);
        localStorage.setItem("walletAddress", accounts[0]);
        const publicAddress = accounts[0];
        if (publicAddress !== "") {
          const data = await getUserDetails();
          console.log(data);
          if (data) {
            dispatch(
              setUserDetails({
                status: data.status,
                email: data.email,
                id_: data.id_,
                name: data.name,
                role: data.role,
              })
            );
            dispatch(setLoginStatus(true));
            navigate((state.state as any)?.from || "/");
          }
        }
      } else {
        toastError("allow metamask! No accounts found");
      }
    } catch (error) {
      console.log(error);
      toastError("Error while logging in");
    }
  }, []);

  const getAccounts = useCallback(async function getAccount() {
    try {
      dispatch(setLoading(true));
      if (!web3) {
        web3 = new Web3((window as any).ethereum);
        const accounts = await web3?.eth.getAccounts();
        if (accounts.length !== 0) {
          const data = await getUserDetails();
          if (data) {
            dispatch(
              setUserDetails({
                status: data.status,
                email: data.email,
                id_: data.id_,
                name: data.name,
                role: data.role,
              })
            );
            dispatch(setLoginStatus(true));
            dispatch(setLoading(false));
            navigate((state.state as any)?.from || "/");
          }
        }
      }
    } catch (e) {
      console.log(e);
      toastError("error while retrieving accounts");
    } finally {
      dispatch(setLoading(false));
    }
  }, []);

  const disConnect = useCallback(async () => {
    dispatch(resetStates());
    dispatch(setLoginStatus(false));
  }, []);
  return {
    connect,
    disConnect,
    getAccounts,
  };
}
