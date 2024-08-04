
// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;


contract HelloWorld {

    string public greeting;

    function SayHello(string memory str) public {
        greeting = str;
    }
}