// contracts/erc20.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FinisherToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Finisher", "FNA") {
        _mint(msg.sender, initialSupply);
    }
}