// SPDX-License-Identifier: GPL-3.0
pragma experimental ABIEncoderV2;
pragma solidity >=0.4.25 <0.9.0;

/**
 * @title Types
 * @author Suresh Konakanchi
 * @dev Library for managing all custom types that were used in KYC process
 */
library Types {
    enum Role {
        Admin, // 0
        Bank, // 1
        Customer // 2
    }

    enum BankStatus {
        Active, // 0
        Inactive // 1
    }

    enum KycStatus {
        Pending, // 0
        KYCVerified, // 1
        KYCFailed // 2
    }

    enum DataHashStatus {
        Pending, // 0
        Approved, // 1
        Rejected // 2
    }

    struct User {
        string name;
        string email;
        address id_;
        Role role;
        BankStatus status;
    }

    struct Customer {
        string name;
        string email;
        uint256 mobileNumber;
        address id_;
        address kycVerifiedBy; // Address of the bank only if KYC gets verified
        string dataHash; // Documents will be stored in decentralised storage & a hash will be created for the same
        uint256 dataUpdatedOn;
    }

    struct Bank {
        string name;
        string email;
        address id_;
        string ifscCode;
        uint16 kycCount; // How many KCY's did this bank completed so far
        BankStatus status; // RBI, we call "admin" here can disable the bank at any instance
    }

    struct KycRequest {
        string id_; // Combination of customer Id & bank is going to be unique
        address userId_;
        string customerName;
        address bankId_;
        string bankName;
        string dataHash;
        uint256 updatedOn;
        KycStatus status;
        DataHashStatus dataRequest; // Get approval from user to access the data
        string additionalNotes; // Notes that can be added if KYC verification fails  OR
        // if customer rejects the access & bank wants to re-request with some message
    }
}
