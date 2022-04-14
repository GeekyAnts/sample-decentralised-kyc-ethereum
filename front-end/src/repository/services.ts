import { Bank, Customer, KycRequest,  User } from "./interfaces";
import { Contract, ethers, utils } from "ethers";
import { CONTRACT_ADDRESS } from "./config";
import { getCurrentEpoch } from "../utils";

declare let window: any;
let KycContractABI = require("./KYC.json");

export class KycServices {
  private static instance: KycServices;
  private _KycContract!: Contract;
  private _accountAdress: string | undefined;
  static eventContract: Contract;

  // private constructor() {
  //   this._KycContract = this.getContract(CONTRACT_ADDRESS);

  //   new ethers.providers.Web3Provider(window.ethereum).on(filter, () => {
  //     console.log("i am here in events");
  //     // do whatever you want here
  //     // I'm pretty sure this returns a promise, so don't forget to resolve it
  //   });
  //   // https://docs.ethers.io/v5/api/providers/provider/#Provider--events
  // }
  public static getInstance(): KycServices {
    if (!KycServices.instance) {
      KycServices.instance = new KycServices();
    }
    return KycServices.instance;
  }
  checkedWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return false;
      }
      await ethereum.enable();

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${Number(4).toString(16)}` }],
      });
      this._accountAdress = accounts[0];
      this._KycContract = this.getContract(CONTRACT_ADDRESS);
      KycServices.eventContract = this._KycContract;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  async ethEnabled() {
    return await this.checkedWallet();
  }

  private getContract(contractAddress: string) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, KycContractABI["abi"], signer);
  }

  /* admin methods */
  async getAllBanks(pageNumber: number): Promise<[number, Bank[]]> {
    try {
      await this.ethEnabled();
      const res = await this._KycContract.getAllBanks(pageNumber);
      return res;
    } catch (error) {
      throw error;
    }
  }
  async addBank(bank: Bank) {
    try {
      await this.ethEnabled();
      const res = await this._KycContract.addBank(bank);
      return res;
    } catch (error) {
      throw error;
    }
  }

  // here onwards id refers to wallet address i.e. metamask address
  async updateBankDetails(data: { id: string; email: string; name: string }) {
    try {
      await this.ethEnabled();
      const res = await this._KycContract.updateBankDetails(
        data.id,
        data.email,
        data.name
      );
      return res;
    } catch (error) {
      throw error;
    }
  }
  async activateDeactivateBank(id: string, status: boolean) {
    try {
      await this.ethEnabled();
      const res = await this._KycContract.activateDeactivateBank(id, status);
      return res;
    } catch (error) {
      throw error;
    }
  }
  /* institution methods */
  async getCustomersOfBank(
    pageNumber: number
  ): Promise<[number, KycRequest[]]> {
    try {
      await this.ethEnabled();
      const res = await this._KycContract.getCustomersOfBank(pageNumber);
      return res;
    } catch (error) {
      throw error;
    }
  }

  async getCustomerDetails(id: string): Promise<Customer> {
    try {
      await this.ethEnabled();
      const res = await this._KycContract.getCustomerDetails(id);
      return res;
    } catch (error) {
      throw error;
    }
  }
  async addKycRequest(customer: Customer, time: number, notes: string) {
    try {
      await this.ethEnabled();
      const res = await this._KycContract.addKycRequest(customer, time, notes);
      return res;
    } catch (error) {
      throw error;
    }
  }
  async reRequestForKycRequest(id: string, notes: string) {
    try {
      await this.ethEnabled();
      const res = await this._KycContract.reRequestForKycRequest(id, notes);
      return res;
    } catch (error) {
      throw error;
    }
  }
  async updateKycVerification(data: {
    id: string;
    notes: string;
    isVerified: boolean;
  }) {
    try {
      await this.ethEnabled();
      const res = await this._KycContract.updateKycVerification(
        data.id,
        data.isVerified,
        data.notes
      );
      return res;
    } catch (error) {
      throw error;
    }
  }
  async searchCustomers(id: string): Promise<[boolean, Customer, KycRequest]> {
    try {
      await this.ethEnabled();
      const res = await this._KycContract.searchCustomers(id);
      return res;
    } catch (error) {
      throw error;
    }
  }
  /* customer methods */

  async getBankRequests(
    currentPageNumber: number
  ): Promise<[number, KycRequest[]]> {
    try {
      await this.ethEnabled();
      const res = await this._KycContract.getBankRequests(currentPageNumber);
      return res;
    } catch (error) {
      throw error;
    }
  }
  async getBankDetails(id: string): Promise<Bank> {
    try {
      await this.ethEnabled();
      const res = await this._KycContract.getBankDetails(id);
      return res;
    } catch (error) {
      throw error;
    }
  }
  async actionOnKycRequest(bankId: string, isApproved: boolean, notes: string) {
    try {
      await this.ethEnabled();
      const res = await this._KycContract.actionOnKycRequest(
        bankId,
        isApproved,
        notes
      );
      console.log(res, "response header");
      return res;
    } catch (error) {
      throw error;
    }
  }
  async updateProfile(name: string, email: string, number: string) {
    try {
      await this.ethEnabled();
      const res = await this._KycContract.updateProfile(name, email, number);
      return res;
    } catch (error) {
      throw error;
    }
  }
  async updateDatahash(hash: string) {
    try {
      await this.ethEnabled();
      const secondsSinceEpoch = getCurrentEpoch();
      const res = await this._KycContract.updateDatahash(
        hash,
        secondsSinceEpoch
      );
      return res;
    } catch (error) {
      throw error;
    }
  }
  async removerDatahashPermission(id: string, notes: string) {
    try {
      await this.ethEnabled();
      const res = await this._KycContract.removerDatahashPermission(id, notes);
      return res;
    } catch (error) {
      throw error;
    }
  }
  async searchBanks(id: string): Promise<[boolean, Bank, KycRequest]> {
    try {
      await this.ethEnabled();
      const res = await this._KycContract.searchBanks(id);
      return res;
    } catch (error) {
      throw error;
    }
  }
  async getUserInfo(): Promise<User> {
    try {
      await this.ethEnabled();
      const res = await this._KycContract.whoAmI();
      return res;
    } catch (error) {
      throw error;
    }
  }
}

const filter = {
  address: CONTRACT_ADDRESS,
  topics: [
    // the name of the event, parnetheses containing the data type of each event, no spaces
    utils.id(
      // "newProduct(string manufacturerName,string scientificName,string barcodeId,uint256 manDateEpoch,uint256 expDateEpoch)"
      "bankAdded(address id_,string name,string email,string ifscCode)"
    ),
  ],
};

function Decodeuint8arr(uint8array: any) {
  return new TextDecoder("utf-8").decode(uint8array);
}
