import { create, IPFSHTTPClient } from "ipfs-http-client";
import { toastError } from "../utils";

const authorization =
  "Basic " +
  btoa("26dVLtNicClganw3SW8KjbUDFU:129e759796dc95a087c4774897e541b8");

export const useIpfs = () => {
  let ipfs: IPFSHTTPClient | undefined;
  (() => {
    try {
      ipfs = create({
        url: "https://ipfs.infura.io:5001",
        headers: {
          authorization,
        },
      });
    } catch (error) {
      toastError("IPFS failure");
      ipfs = undefined;
    }
  })();

  const upload = async (data: any) => {
    try {
      const result = await (ipfs as IPFSHTTPClient).add(data);
      return result;
    } catch (error) {
      toastError("Failed to upload");
    }
  };

  const getDataFromIpfs = async (path: string) => {
    try {
      const decode = await fetch(`https://ipfs.infura.io/ipfs/${path}`);
      const res = await decode.json();
      if (res) {
        return res;
      } else {
        toastError("data not found");
        return "";
      }
    } catch (error) {
      toastError("Failed to fetch data from ipfs");
    }
  };

  return {
    upload,
    getDataFromIpfs,
  };
};
