// Add it in node project & try testing

const Web3 = require("web3");
const fs = require("fs");

function getWeb3() {
  return new Web3("http://localhost:7545");
}

function getKycContract(web3) {
  const abi = JSON.parse(
    fs.readFileSync("./KYC.abi", {
      encoding: "utf-8",
    })
  );
  return new web3.eth.Contract(
    abi,
    "0x5F5d5A889F4493C9102f8A4EFC577100964fBdDB", // contract address
    {
      // from: "0x7877F2bcF2d7fCd2D62bB013CC47Af1Ec29C639A", // Admin
      from: "0x8BfAD6c33857AC5d4Ad4D160DBd178c0fA26cDf0", // Bank
      // from: "0x0b3722F124249d89232e819D9496C27c32Fa0caa", // Bank
      // from: "0x42794209Dd75Dfe19cD3154CD16c532236c82B0D", // Customer
      // from: "0xf2BC3a607874823B07C9b3a0866BBf60464CF924", // Customer
      gas: 6721975,
    }
  );
}

async function main() {
  const web3 = getWeb3();
  const kycTest = getKycContract(web3);

  try {
    // Admin
    // await addNewBank(kycTest);
    // await getBanksList(kycTest);
    // await updateBankInfo(kycTest);
    // await deactivateBank(kycTest);
    // await activateBank(kycTest);

    // Bank
    // await addNewKycRequest(kycTest);
    // await getAllCustomers(kycTest);
    // await getCustomerInfo(kycTest);
    await searchForCustomer(kycTest);
    // await reRequestForDocPermission(kycTest);
    // await markKycVerified(kycTest);
    // await markKycRejected(kycTest);

    // Customer
    // await getAllBankRequests(kycTest);
    // await getBankInfo(kycTest);
    // await updateMyProfile(kycTest);
    // await updateDocumentHash(kycTest);
    // await searchForBank(kycTest);
    // await rejectDatahashPermission(kycTest);
    // await approveDatahashPermission(kycTest);
    // await removeDocumentReadpermission(kycTest);
  } catch (e) {
    console.log("Catch: ", e);
  }
}

// Admin methods

async function addNewBank(kycTest) {
  const info_ = await kycTest.methods
    .addBank({
      id_: "0x8BfAD6c33857AC5d4Ad4D160DBd178c0fA26cDf0",
      name: "SBI",
      email: "admin@sbi.com",
      ifscCode: "SBIN0001453",
      kycCount: 0,
      status: 0, // 0 - Active, 1 - Inactive
    })
    // .addBank({
    //   id_: "0x0b3722F124249d89232e819D9496C27c32Fa0caa",
    //   name: "HDFC",
    //   email: "admin@hdfc.in",
    //   ifscCode: "HDFC00IN743",
    //   kycCount: 0,
    //   status: 0, // 0 - Active, 1 - Inactive
    // })
    .send();
  console.log(info_);

  /*
  {
    transactionHash:
      "0xc02370d709fc506f9bf08334ad6a0c4e619c70346ead7aabc47132be8eabb323",
    transactionIndex: 0,
    blockHash:
      "0xfa87e785aa9242b9cd53e49804a277d6576ebbe951e93ccef324568e5525d798",
    blockNumber: 21,
    from: "0x7877f2bcf2d7fcd2d62bb013cc47af1ec29c639a",
    to: "0xbf5552656fc8b0e1cee5a9f689adabbabae434ca",
    gasUsed: 254018,
    cumulativeGasUsed: 254018,
    contractAddress: null,
    status: true,
    logsBloom:
      "0x00000000000000000000020000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000010000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    events: {
      bankAdded: {
        logIndex: 0,
        transactionIndex: 0,
        transactionHash:
          "0xc02370d709fc506f9bf08334ad6a0c4e619c70346ead7aabc47132be8eabb323",
        blockHash:
          "0xfa87e785aa9242b9cd53e49804a277d6576ebbe951e93ccef324568e5525d798",
        blockNumber: 21,
        address: "0xbf5552656fc8B0E1CeE5a9F689ADabBaBAE434CA",
        type: "mined",
        id: "log_479235a4",
        returnValues: [Result],
        event: "bankAdded",
        signature:
          "0x0f27835eeff4435ef5b316a7483705fbe43b8e84c024b62e4f8f01051c605291",
        raw: [Object],
      },
    },
  }
  */
}

async function getBanksList(kycTest) {
  const _list = await kycTest.methods.getAllBanks(1).call();
  console.log(_list);

  /*
  Result {
    '1': [
      [
        name: "SBI",
        email: "admin@sbi.com",
        id_: "0x8BfAD6c33857AC5d4Ad4D160DBd178c0fA26cDf0",
        ifscCode: "SBIN0001453",
        kycCount: "0",
        status: "0",
      ],
      [
        name: "HDFC",
        email: "admin@hdfc.in",
        id_: "0x0b3722F124249d89232e819D9496C27c32Fa0caa",
        ifscCode: "HDFC00IN743",
        kycCount: "0",
        status: "0",
      ],
    ],
    totalPages: "1",
  }
  */
}

async function updateBankInfo(kycTest) {
  const info_ = await kycTest.methods
    .updateBankDetails(
      "0x8BfAD6c33857AC5d4Ad4D160DBd178c0fA26cDf0",
      "admin@sbi.in",
      "State Bank of India"
    )
    // .updateBankDetails(
    //   "0x0b3722F124249d89232e819D9496C27c32Fa0caa",
    //   "admin@hdfc.com",
    //   "HDFC"
    // )
    .send();
  console.log(info_);

  /*
  {
    transactionHash:
      "0xfba15693f1657c23ad9244d6fd4065a6eeabc4817a4be728bd1691ea56858e00",
    transactionIndex: 0,
    blockHash:
      "0xb2627fb23752c2f692409a5b9a11a592af4c33e8b80fdfe78177ca31ad889a7c",
    blockNumber: 23,
    from: "0x7877f2bcf2d7fcd2d62bb013cc47af1ec29c639a",
    to: "0xbf5552656fc8b0e1cee5a9f689adabbabae434ca",
    gasUsed: 57930,
    cumulativeGasUsed: 57930,
    contractAddress: null,
    status: true,
    logsBloom:
      "0x00000000000000000400000000000000000000010000000000000000000000400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000400000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    events: {
      bankUpdated: {
        logIndex: 0,
        transactionIndex: 0,
        transactionHash:
          "0xfba15693f1657c23ad9244d6fd4065a6eeabc4817a4be728bd1691ea56858e00",
        blockHash:
          "0xb2627fb23752c2f692409a5b9a11a592af4c33e8b80fdfe78177ca31ad889a7c",
        blockNumber: 23,
        address: "0xbf5552656fc8B0E1CeE5a9F689ADabBaBAE434CA",
        type: "mined",
        id: "log_2741a42e",
        returnValues: [Result],
        event: "bankUpdated",
        signature:
          "0x74cd6e532dcf2fe854caa2872723682d6b5d2d3dd44be0e76743ca89ec24f697",
        raw: [Object],
      },
    },
  }
  */
}

async function activateBank(kycTest) {
  const info_ = await kycTest.methods
    .activateDeactivateBank("0x8BfAD6c33857AC5d4Ad4D160DBd178c0fA26cDf0", true)
    // .updateBankDetails("0x0b3722F124249d89232e819D9496C27c32Fa0caa", true)
    .send();
  console.log(info_);

  /*
  {
    transactionHash:
      "0x1c22479286f2089668e368bb058c49327ee6c3ee7f323af9ee4864b503b0cb66",
    transactionIndex: 0,
    blockHash:
      "0xeba5f134700359ccb017babb815750c4bc2c6d1e23a3b266bad1dc8240c24e45",
    blockNumber: 25,
    from: "0x7877f2bcf2d7fcd2d62bb013cc47af1ec29c639a",
    to: "0xbf5552656fc8b0e1cee5a9f689adabbabae434ca",
    gasUsed: 25026,
    cumulativeGasUsed: 25026,
    contractAddress: null,
    status: true,
    logsBloom:
      "0x00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    events: {
      bankActivated: {
        logIndex: 0,
        transactionIndex: 0,
        transactionHash:
          "0x1c22479286f2089668e368bb058c49327ee6c3ee7f323af9ee4864b503b0cb66",
        blockHash:
          "0xeba5f134700359ccb017babb815750c4bc2c6d1e23a3b266bad1dc8240c24e45",
        blockNumber: 25,
        address: "0xbf5552656fc8B0E1CeE5a9F689ADabBaBAE434CA",
        type: "mined",
        id: "log_60b5e317",
        returnValues: [Result],
        event: "bankActivated",
        signature:
          "0x2306f9db139cf81a6a97596f0207f401d4e5e85560338d56ede4116e0077bf7e",
        raw: [Object],
      },
    },
  }
  */
}

async function deactivateBank(kycTest) {
  const info_ = await kycTest.methods
    .activateDeactivateBank("0x8BfAD6c33857AC5d4Ad4D160DBd178c0fA26cDf0", false)
    // .updateBankDetails("0x0b3722F124249d89232e819D9496C27c32Fa0caa", false)
    .send();
  console.log(info_);

  /*
  {
    transactionHash:
      "0x80d435fd28b5ed614b1e20466f32c401ba171e86e88157173a00ac9e3ed5cfa4",
    transactionIndex: 0,
    blockHash:
      "0xd932ef20a1ccdb4e68dfd82748600fd576b1de17ef02842b479d4dd3f4715848",
    blockNumber: 24,
    from: "0x7877f2bcf2d7fcd2d62bb013cc47af1ec29c639a",
    to: "0xbf5552656fc8b0e1cee5a9f689adabbabae434ca",
    gasUsed: 55063,
    cumulativeGasUsed: 55063,
    contractAddress: null,
    status: true,
    logsBloom:
      "0x00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000400000000000000000000010000000000000000000000000000000000000",
    events: {
      bankDeactivated: {
        logIndex: 0,
        transactionIndex: 0,
        transactionHash:
          "0x80d435fd28b5ed614b1e20466f32c401ba171e86e88157173a00ac9e3ed5cfa4",
        blockHash:
          "0xd932ef20a1ccdb4e68dfd82748600fd576b1de17ef02842b479d4dd3f4715848",
        blockNumber: 24,
        address: "0xbf5552656fc8B0E1CeE5a9F689ADabBaBAE434CA",
        type: "mined",
        id: "log_b299a2e3",
        returnValues: [Result],
        event: "bankDeactivated",
        signature:
          "0x403be3ae1cd7a15f1f9fe7b35b80f0db16f8a1d671cc3df81497f67262b2ab56",
        raw: [Object],
      },
    },
  }
  */
}

// Bank methods

async function getAllCustomers(kycTest) {
  const _list = await kycTest.methods.getCustomersOfBank(1).call();
  console.log(_list);
}

async function getCustomerInfo(kycTest) {
  const _details = await kycTest.methods
    .getCustomerDetails("0x42794209Dd75Dfe19cD3154CD16c532236c82B0D")
    // .getBankDetails("0xf2BC3a607874823B07C9b3a0866BBf60464CF924")
    .call();
  console.log(_details);
}

async function addNewKycRequest(kycTest) {
  const info_ = await kycTest.methods
    .addKycRequest(
      {
        id_: "0x42794209Dd75Dfe19cD3154CD16c532236c82B0D",
        name: "Suresh",
        email: "suresh@geekyants.com",
        mobileNumber: 8877665544,
        kycVerifiedBy: "0x0000000000000000000000000000000000000000",
        dataHash: "QmahBFWv89M28e3qkMp8deSD2u4ihHntUHAURWBH1QiCB6",
        dataUpdatedOn: 0, // time when data hash updates
      },
      1649230771,
      "Doc permission needed for loan processing"
    )
    // .addKycRequest(
    //   {
    //     id_: "0xf2BC3a607874823B07C9b3a0866BBf60464CF924",
    //     name: "Pushkar",
    //     email: "pushkar@geekyants.com",
    //     mobileNumber: 9988776655,
    //     kycVerifiedBy: "0x0000000000000000000000000000000000000000",
    //     dataHash: "QmahBFWv89M28e3qkMp8deSD2u4ihHntUHAURWBH1QiCB6",
    //     dataUpdatedOn: 0, // time when data hash updates
    //   },
    //   1649230771,
    //   "Doc permission needed for loan processing"
    // )
    .send();
  console.log(info_);
}

async function reRequestForDocPermission(kycTest) {
  const info_ = await kycTest.methods
    .reRequestForKycRequest(
      "0x42794209Dd75Dfe19cD3154CD16c532236c82B0D",
      "With no permisison, Loan application will be rejected"
    )
    // .reRequestForKycRequest(
    //   "0xf2BC3a607874823B07C9b3a0866BBf60464CF924",
    //   "With no permisison, Loan application will be rejected"
    // )
    .send();
  console.log(info_);
}

async function markKycVerified(kycTest) {
  const _info = await kycTest.methods
    .updateKycVerification(
      "0x42794209Dd75Dfe19cD3154CD16c532236c82B0D",
      true,
      ""
    )
    // .updateKycVerification(
    //   "0xf2BC3a607874823B07C9b3a0866BBf60464CF924",
    //   true,
    //   ""
    // )
    .send();
  console.log(_info);
}

async function markKycRejected(kycTest) {
  const _info = await kycTest.methods
    .updateKycVerification(
      "0x42794209Dd75Dfe19cD3154CD16c532236c82B0D",
      false,
      "Invalid Documents, Re-upload!"
    )
    // .updateKycVerification(
    //   "0xf2BC3a607874823B07C9b3a0866BBf60464CF924",
    //   false,
    //   "Invalid Documents, Re-upload!"
    // )
    .send();
  console.log(_info);
}

async function searchForCustomer(kycTest) {
  const _customer = await kycTest.methods
    .searchCustomers("0x42794209Dd75Dfe19cD3154CD16c532236c82B0D")
    // .searchCustomers("0xf2BC3a607874823B07C9b3a0866BBf60464CF924")
    .call();
  console.log(_customer);
}

// Customer methods

async function getAllBankRequests(kycTest) {
  const _list = await kycTest.methods.getBankRequests(1).call();
  console.log(_list);
}

async function getBankInfo(kycTest) {
  const _details = await kycTest.methods
    .getBankDetails("0x8BfAD6c33857AC5d4Ad4D160DBd178c0fA26cDf0")
    // .getBankDetails("0x0b3722F124249d89232e819D9496C27c32Fa0caa")
    .call();
  console.log(_details);
}

async function approveDatahashPermission(kycTest) {
  const _info = await kycTest.methods
    .actionOnKycRequest("0x8BfAD6c33857AC5d4Ad4D160DBd178c0fA26cDf0", true, "")
    // .actionOnKycRequest("0x0b3722F124249d89232e819D9496C27c32Fa0caa", true, "")
    .send();
  console.log(_info);
}

async function rejectDatahashPermission(kycTest) {
  const _info = await kycTest.methods
    .actionOnKycRequest(
      "0x8BfAD6c33857AC5d4Ad4D160DBd178c0fA26cDf0",
      false,
      "Loan not required"
    )
    // .actionOnKycRequest(
    //   "0x0b3722F124249d89232e819D9496C27c32Fa0caa",
    //   false,
    //   "Loan not required"
    // )
    .send();
  console.log(_info);
}

async function updateMyProfile(kycTest) {
  const _info = await kycTest.methods
    .updateProfile(
      "Suresh Konakanchi",
      "konakanchisuresh@gmail.com",
      9505228928
    )
    // .updateProfile("Pushkar Kumar", "kumar.pus95@gmail.com", 9876543210)
    .send();
  console.log(_info);
}

async function updateDocumentHash(kycTest) {
  const _info = await kycTest.methods
    .updateDatahash(
      "QmTNbzET6ANnx6X4xDfeNh5725yKUDuJzbTptAgZedCtfA",
      1649228284
    )
    .send();
  console.log(_info);
}

async function removeDocumentReadpermission(kycTest) {
  const _info = await kycTest.methods
    .removerDatahashPermission(
      "0x8BfAD6c33857AC5d4Ad4D160DBd178c0fA26cDf0",
      "Not intrested to bank with you"
    )
    // .removerDatahashPermission(
    //   "0x0b3722F124249d89232e819D9496C27c32Fa0caa",
    //   "Not intrested to bank with you"
    // )
    .send();
  console.log(_info);
}

async function searchForBank(kycTest) {
  const _bank = await kycTest.methods
    .searchBanks("0x8BfAD6c33857AC5d4Ad4D160DBd178c0fA26cDf0")
    // .searchBanks("0x0b3722F124249d89232e819D9496C27c32Fa0caa")
    .call();
  console.log(_bank);
}

main();
