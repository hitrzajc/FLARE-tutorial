// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

contract Counter {
    uint public count; // public variable to store the count
    
    event Increment(uint value);

    function increment() public {
        count++;
        emit Increment(1);
    }

    function incrementBy(uint value) public {
        require(value > 0, "incrementBy: increment should be positive");
        count += value;
        emit Increment(value);
    }
}
