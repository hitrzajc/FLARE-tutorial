// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

contract Counter {
    uint public count; // public variable to store the count

    function increment() public {
        count++;
    }
}
