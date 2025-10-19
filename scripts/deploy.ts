import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
    const tokenAddress = process.env.ERC20_ADDRESS;

    const Vault = await ethers.getContractFactory("Vault");
    const vault = await Vault.deploy(tokenAddress);

    // Em Ethers v6, deploy retorna direto a transação finalizada
    await vault.waitForDeployment(); 

    console.log("Vault deployed to:", await vault.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
