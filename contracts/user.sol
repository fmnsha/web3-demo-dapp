// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract User {

        struct Player{
            address plAddr;
            string username;
            uint score;
        }

        mapping(address=>Player) public players;


        function createPlayer(address addr , string memory username) public {

            require(players[addr].plAddr == address(0),"player already exist");

            Player memory newPlayer = Player({
                plAddr : addr ,
                username: username,
                score:0
            });

            players[addr] = newPlayer;

        }


}