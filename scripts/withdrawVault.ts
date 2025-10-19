import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const vaultAddress = "0x73bf556D428576624aADa3369620D502e3788067";

  const [owner] = await ethers.getSigners();

  console.log("Usando conta:", owner.address);
  console.log("Vault:", vaultAddress);

  // Instancia o contrato Vault
  const Vault = await ethers.getContractAt("Vault", vaultAddress);

  const amount = ethers.parseUnits("5", 18); // Retirar 5 tokens
  console.log("Solicitando retirada...");

  const withdrawTx = await Vault.withdraw(amount);
  await withdrawTx.wait();

  console.log("✅ Retirada realizada com sucesso!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
