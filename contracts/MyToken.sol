// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    address public owner;

    constructor() ERC20("MyToken", "MTK") {
        owner = msg.sender;
        _mint(msg.sender, 1000 * 10**18); // Mint inicial de 1000 tokens para você
    }

    function mint(address to, uint256 amount) external {
        require(msg.sender == owner, "Only owner can mint"); // Só o dono pode criar tokens
        _mint(to, amount);
    }
}
