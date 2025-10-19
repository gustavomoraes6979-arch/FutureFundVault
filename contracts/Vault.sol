// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Importa a interface ERC20 de um arquivo separado
import "./IERC20.sol";

contract Vault {
    IERC20 public token;      // referência ao ERC20
    address public owner;

    mapping(address => uint256) public balances;

    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress); // liga o Vault ao ERC20 existente
        owner = msg.sender;            // quem cria o contrato é o dono
    }

    // Depositar tokens no Vault
    function deposit(uint256 amount) public {
        require(token.transferFrom(msg.sender, address(this), amount), "Falha no transfer");
        balances[msg.sender] += amount;
    }

    // Retirar tokens do Vault
    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Saldo insuficiente");
        balances[msg.sender] -= amount;
        require(token.transferFrom(address(this), msg.sender, amount), "Falha no transfer");
    }
}
