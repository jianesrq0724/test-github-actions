//SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

contract Bank {
    mapping(address => uint) public deposits;
    uint public x;

    event Transfer(address indexed from, address indexed to, uint256 value);

    function deposit() public payable {
        deposits[msg.sender] += msg.value;
    }

    function withdraw() public {
        uint d = deposits[msg.sender];
        require(d > 0, "Insufficient balance");
        deposits[msg.sender] = 0;
        (bool success, ) = msg.sender.call{value: d}("");
        require(success, "failed to send ether");
    }

    function add(uint a) public {
        require(a < 100, "a < 100");
        x = x + a;
    }
}
