export {};
export enum Role {
  Admin,
  Bank,
  Customer,
}

export enum DataHashStatus {
  Pending, // 0
  Approved, // 1
  Rejected, // 2
}

export enum BankStatus {
  Active,
  Inactive,
}

export enum KycStatus {
  Pending,
  KYCVerified,
  KYCFailed,
}

export type User = {
  name: string;
  email: string;
  id_: string;
  role: Role;
  status: BankStatus;
};

export type Customer = {
  name: string;
  email: string;
  mobileNumber: string;
  id_: string;
  kycVerifiedBy: string;
  dataHash: string;
  dataUpdatedOn: number;
};

export type Bank = {
  name: string;
  email: string;
  id_: string;
  ifscCode: string;
  kycCount: string;
  status: BankStatus;
};

export type KycRequest = {
  userId_: string;
  customerName: string;
  bankId_: string;
  bankName: string;
  dataHash: string;
  updatedOn: number;
  status: KycStatus;
  dataRequest: DataHashStatus; // Get approval from user to access the data
  additionalNotes: string;
};
