// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.25 <0.9.0;

import "../contracts/Kyc.sol";
import "../contracts/Types.sol";

contract KycTest {
    KYC kycToTest = new KYC("Suresh", "suresh@geekyants.com");

    function isBankSBI() public {
        kycToTest.addBank(
            Types.Bank({
                id_: address(0x8BfAD6c33857AC5d4Ad4D160DBd178c0fA26cDf0),
                name: "SBI",
                email: "admin@sbi.com",
                ifscCode: "SBIN0001453",
                kycCount: 0,
                status: Types.BankStatus.Active
            })
        );
        (uint256 totalPages, Types.Bank[] memory list_) = kycToTest.getAllBanks(
            1
        );
        assert.equal(
            list_[0].id_,
            address(0x8BfAD6c33857AC5d4Ad4D160DBd178c0fA26cDf0),
            "Suresh is an eligible voter"
        );
    }
}
