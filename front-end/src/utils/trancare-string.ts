import {
  Bank,
  BankStatus,
  DataHashStatus,
  KycRequest,
  KycStatus,
} from "../repository";

export const truncateString = (address: string) => {
  const prefix = address.substring(0, 4).concat(".....");
  const postfix = address.substring(address.length - 4);
  return prefix + postfix;
};

export function countCase(data: KycRequest[]) {
  type Acc = { approved: number; rejected: number };
  const count = data.reduce(
    (acc: Acc, item: KycRequest): Acc => {
      if (item.status === KycStatus.KYCVerified) {
        acc.approved += 1;
      } else if (item.status === KycStatus.KYCFailed) {
        acc.rejected += 1;
      }
      return acc;
    },
    { approved: 0, rejected: 0 }
  );
  return count;
}

export function countCaseAdmin(data: Bank[]) {
  return data.reduce(
    (acc: { inActive: number; active: number }, i) => {
      if (i.status === BankStatus.Active) {
        acc.active += 1;
      } else if (i.status === BankStatus.Inactive) {
        acc.inActive += 1;
      }
      return acc;
    },
    { inActive: 0, active: 0 }
  );
}

export function countCaseCustomer(data: KycRequest[]) {
  type Acc = { approved: number; rejected: number };
  const count = data.reduce(
    (acc: Acc, item: KycRequest): Acc => {
      if (item.dataRequest === DataHashStatus.Approved) {
        acc.approved += 1;
      } else if (item.dataRequest === DataHashStatus.Rejected) {
        acc.rejected += 1;
      }
      return acc;
    },
    { approved: 0, rejected: 0 }
  );
  console.log(count, "case cc");
  return count;
}

export function scroll() {
  try {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  } catch (error) {
    window.scrollTo(0, 0);
  }
}
