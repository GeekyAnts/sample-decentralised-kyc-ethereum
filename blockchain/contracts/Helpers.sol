// SPDX-License-Identifier: GPL-3.0
pragma experimental ABIEncoderV2;
pragma solidity >=0.4.25 <0.9.0;

/**
 * @title Helpers
 * @author Suresh Konakanchi
 * @dev Library for managing all the helper functions
 */
library Helpers {
    /**
     * @dev List of customers, who are linked to the current bank. Data will be sent in pages to avoid the more gas fee
     * @param pageNumber page number for which data is needed (1..2..3....n)
     * @param users_ User Id's who are linked to the requested bank
     * @return pages Total pages available
     * @return pageLength_ Length of the current page
     * @return startIndex_ Starting index of the current page
     * @return endIndex_ Ending index of the current page
     */
    function getIndexes(uint256 pageNumber, address[] memory users_)
        internal
        pure
        returns (
            uint256 pages,
            uint256 pageLength_,
            uint256 startIndex_,
            uint256 endIndex_
        )
    {
        uint256 reminder_ = users_.length % 25;
        pages = users_.length / 25;
        if (reminder_ > 0) pages++;

        pageLength_ = 25;
        startIndex_ = 25 * (pageNumber - 1);
        endIndex_ = 25 * pageNumber;

        if (pageNumber > pages) {
            // Page requested is not existing
            pageLength_ = 0;
            endIndex_ = 0;
        } else if (pageNumber == pages && reminder_ > 0) {
            // Last page where we don't had 25 records
            pageLength_ = reminder_;
            endIndex_ = users_.length;
        }
    }

    /**
     * @notice Internal function which doesn't alter any stage or read any data
     * Used to compare the string operations. Little costly in terms of gas fee
     * @param a string-1 that is to be compared
     * @param b string-2 that is to be compared
     * @return boolean value to say if both strings matched or not
     */
    function compareStrings(string memory a, string memory b)
        internal
        pure
        returns (bool)
    {
        return (keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b))));
    }

    /**
     * @notice Internal function used to concatenate two addresses.
     * @param a address-1
     * @param b address-2 that needs to be appended
     * @return string value after concatenating
     */
    function append(address a, address b)
        internal
        pure
        returns (string memory)
    {
        return string(abi.encodePacked(a, b));
    }
}
