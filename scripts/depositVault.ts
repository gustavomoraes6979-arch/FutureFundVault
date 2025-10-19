import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const vaultAddress = "0x73bf556D428576624aADa3369620D502e3788067"; // endereço do Vault
  const tokenAddress = process.env.ERC20_ADDRESS!; // seu token ERC20

  const [owner] = await ethers.getSigners();

  console.log("Usando conta:", owner.address);
  console.log("Vault:", vaultAddress);
  console.log("Token:", tokenAddress);

  // Instancia o contrato ERC20
  const token = await ethers.getContractAt("contracts/IERC20.sol:IERC20", tokenAddress);


  // Valor do depósito (ajuste conforme necessário)
  const amount = ethers.parseUnits("10", 18); // 10 tokens (ajuste se seu token tiver 18 decimais)

  console.log("Aprovando Vault para gastar tokens...");
  const approveTx = await token.approve(vaultAddress, amount);
  await approveTx.wait();
  console.log("✅ Aprovado com sucesso.");

  // Instancia o contrato Vault
  const Vault = await ethers.getContractAt("Vault", vaultAddress);

  console.log("Depositando tokens no Vault...");
  const depositTx = await Vault.deposit(amount);
  await depositTx.wait();

  console.log("✅ Depósito realizado com sucesso!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
