// SPDX-License-Identifier: GPL-3.0
pragma experimental ABIEncoderV2;
pragma solidity >=0.4.25 <0.9.0;

import "./Types.sol";
import "./Helpers.sol";

/**
 * @title Banks
 * @author Suresh Konakanchi
 * @dev Library for managing all finanicial institutions thata were involved in the KYC process
 */
contract Banks {
    address[] internal bankList;
    mapping(address => Types.Bank) internal banks;

    // Events

    event BankAdded(address id_, string name, string email, string ifscCode);
    event BankUpdated(address id_, string name, string email);
    event BankActivated(address id_, string name);
    event BankDeactivated(address id_, string name);

    // Modifiers

    /**
     * @notice Checks whether the requestor is bank & is active
     * @param id_ Metamask address of the bank
     */
    modifier isValidBank(address id_) {
        require(banks[id_].id_ != address(0), "Bank not found");
        require(banks[id_].id_ == id_, "Bank not found");
        require(
            banks[id_].status == Types.BankStatus.Active,
            "Bank is not active"
        );
        _;
    }

    // Contract Methods

    /**
     * @dev All the banks list. Data will be sent in pages to avoid the more gas fee
     * @param pageNumber page number for which data is needed (1..2..3....n)
     * @return totalPages Total pages available
     * @return Bank[] List of banks in the current page
     */
    function getallbanks(uint256 pageNumber)
        internal
        view
        returns (uint256 totalPages, Types.Bank[] memory)
    {
        require(pageNumber > 0, "PN should be > 0");
        (
            uint256 pages,
            uint256 pageLength_,
            uint256 startIndex_,
            uint256 endIndex_
        ) = Helpers.getIndexes(pageNumber, bankList);

        Types.Bank[] memory banksList_ = new Types.Bank[](pageLength_);
        for (uint256 i = startIndex_; i < endIndex_; i++)
            banksList_[i] = banks[bankList[i]];
        return (pages, banksList_);
    }

    /**
     * @dev To get details of the single bank
     * @param id_ metamask address of the requested bank
     * @return Bank Details of the bank
     */
    function getsinglebank(address id_)
        internal
        view
        returns (Types.Bank memory)
    {
        require(id_ != address(0), "Bank Id Empty");
        return banks[id_];
    }

    /**
     * @dev To add new bank account
     * @param bank_ Bank details, which need to be added to the system
     */
    function addbank(Types.Bank memory bank_) internal {
        require(banks[bank_.id_].id_ == address(0), "Bank exists");

        banks[bank_.id_] = bank_;
        bankList.push(bank_.id_);
        emit BankAdded(bank_.id_, bank_.name, bank_.email, bank_.ifscCode);
    }

    /**
     * @dev To add new bank account
     * @param id_ Bank's metamask address
     * @param email_ Bank's email address that need to be updated
     * @param name_ Bank's name which need to be updated
     */
    function updatebank(
        address id_,
        string memory email_,
        string memory name_
    ) internal {
        require(banks[id_].id_ != address(0), "Bank not found");

        banks[id_].name = name_;
        banks[id_].email = email_;
        emit BankUpdated(id_, name_, email_);
    }

    /**
     * @dev To add new bank account
     * @param id_ Bank's metamask address
     * @param makeActive_ If true, bank will be marked as active, else, it will be marked as deactivateds
     * @return BankStatus current status of the bank to update in common list
     */
    function activatedeactivatebank(address id_, bool makeActive_)
        internal
        returns (Types.BankStatus)
    {
        require(banks[id_].id_ != address(0), "Bank not found");

        if (makeActive_ && banks[id_].status == Types.BankStatus.Inactive) {
            banks[id_].status = Types.BankStatus.Active;
            emit BankActivated(id_, banks[id_].name);

            // Updating in common list
            return Types.BankStatus.Active;
        } else if (
            !makeActive_ && banks[id_].status == Types.BankStatus.Active
        ) {
            banks[id_].status = Types.BankStatus.Inactive;
            emit BankDeactivated(id_, banks[id_].name);

            // Updating in common list
            return Types.BankStatus.Inactive;
        } else {
            // Already upto date
            return banks[id_].status;
        }
    }

    /**
     * @dev To update the kyc count that bank did
     * @param id_ Bank's metamask address
     */
    function updatekyccount(address id_) internal {
        require(id_ != address(0), "Bank not found");
        banks[id_].kycCount++;
    }
}
