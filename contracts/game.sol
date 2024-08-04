
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;


interface IUser {
    function createPlayer(address addr , string memory username) external; 
}

contract game {
    uint gameCount;
    IUser userContract;

    constructor(address _userContractAdress) {
        userContract = IUser(_userContractAdress);
    }

    function startGame(string memory username) public {
        userContract.createPlayer(msg.sender,username);
        gameCount++;
    }

}