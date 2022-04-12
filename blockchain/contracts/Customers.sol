// SPDX-License-Identifier: GPL-3.0
pragma experimental ABIEncoderV2;
pragma solidity >=0.4.25 <0.9.0;

import "./Types.sol";
import "./Helpers.sol";

/**
 * @title Customers
 * @author Suresh Konakanchi
 * @dev Library for managing all customers, who are involved in the KYC process
 */
contract Customers {
    address[] internal customerList;
    mapping(address => Types.Customer) internal customers;

    // Events

    event CustomerAdded(address id_, string name, string email);
    event CustomerDataUpdated(address id_, string name, string email);
    event DataHashUpdated(address id_, string customerName, string dataHash);

    // Modifiers

    /**
     * @notice Checks whether customer already exists
     * @param id_ Metamask address of the customer
     */
    modifier isValidCustomer(address id_) {
        require(id_ != address(0), "Id is Empty");
        require(customers[id_].id_ != address(0), "User Id Empty");
        require(
            !Helpers.compareStrings(customers[id_].email, ""),
            "User Email Empty"
        );
        _;
    }

    // Support Functions

    /**
     * @notice Checks whether customer already exists
     * @param id_ Metamask address of the customer
     * @return exists_ boolean value to say if customer exists or not
     */
    function customerExists(address id_) internal view returns (bool exists_) {
        require(id_ != address(0), "Id is empty");
        if (
            customers[id_].id_ != address(0) &&
            !Helpers.compareStrings(customers[id_].email, "")
        ) {
            exists_ = true;
        }
    }

    // Contract Functions

    /**
     * @dev To get details of the customer
     * @param id_ Customer's metamask address
     * @return Customer object which will have complete details of the customer
     */
    function getcustomerdetails(address id_)
        internal
        view
        returns (Types.Customer memory)
    {
        return customers[id_];
    }

    /**
     * @dev Updates the user profile
     * @param name_ Customer name
     * @param email_ Email that need to be updated
     * @param mobile_ Mobile number that need to be updated
     */
    function updateprofile(
        string memory name_,
        string memory email_,
        uint256 mobile_
    ) internal {
        customers[msg.sender].name = name_;
        customers[msg.sender].email = email_;
        customers[msg.sender].mobileNumber = mobile_;
        emit CustomerDataUpdated(msg.sender, name_, email_);
    }

    /**
     * @dev Add new customer
     * @param customer_ Customer object
     */
    function addcustomer(Types.Customer memory customer_) internal {
        customers[customer_.id_] = customer_;
        customerList.push(customer_.id_);
        emit CustomerAdded(customer_.id_, customer_.name, customer_.email);
    }

    /**
     * @dev To Update KYC verification bank
     * @param id_ Customer's metamask ID
     */
    function updatekycdoneby(address id_) internal {
        require(id_ != address(0), "Customer Id Empty");
        customers[id_].kycVerifiedBy = msg.sender;
    }

    /**
     * @dev Updates the Datahash of the documents
     * @param hash_ Data hash value that need to be updated
     * @param currentTime_ Current Date Time in unix epoch timestamp
     */
    function updatedatahash(string memory hash_, uint256 currentTime_)
        internal
    {
        customers[msg.sender].dataHash = hash_;
        customers[msg.sender].dataUpdatedOn = currentTime_;
        emit DataHashUpdated(msg.sender, customers[msg.sender].name, hash_);
    }

    /**
     * @dev Search for customer details in the list that the bank is directly linked to
     * @param id_ Customer's metamask Id
     * @param customers_ Customer metamask Id's
     * @return boolean to say if customer exists or not
     * @return Customer object to get the complete details of the customer
     * Costly operation if we had more customers linked to this single bank
     */
    function searchcustomers(address id_, address[] memory customers_)
        internal
        view
        returns (bool, Types.Customer memory)
    {
        bool found_;
        Types.Customer memory customer_;

        for (uint256 i = 0; i < customers_.length; i++) {
            if (customers_[i] == id_) {
                found_ = true;
                customer_ = customers[id_];
                break;
            }
        }
        return (found_, customer_);
    }
}
