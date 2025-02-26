const hre = require("hardhat");
import { expect } from 'chai';

let privateKey = "6c0de25402cec4acd2b2b6dbadf9a5fed635aa2995f765de28155a0827fe6af4"
// 0xb8e3d12b9517358a74492b6316877ea409ffffff  deploy

async function main() {
  console.log('network:', (await hre.ethers.provider.getNetwork()).name, (await hre.ethers.provider.getNetwork()).chainId);
  const deployer = new hre.ethers.Wallet(privateKey, hre.ethers.provider);

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const BalanceFactory = await hre.ethers.getContractFactory("Balance");
  const Balance = await BalanceFactory.connect(deployer).deploy(await getGasFee());
  console.log("Balance deployed to:", Balance.address.toLowerCase());

}

// 加载GAS费
async function getGasFee() {
  const maxPriority = await hre.ethers.provider.send("eth_maxPriorityFeePerGas", []);
  let baseFee = (await hre.ethers.provider.getBlock("latest")).baseFeePerGas;
  if (!baseFee || !maxPriority) {
    throw new Error("无法获取链上的 baseFee 或 maxPriorityFeePerGas");
  }
  console.log("maxPriorityFeePerGas (Gwei):", hre.ethers.utils.formatUnits(maxPriority, "gwei"), "Gwei");
  console.log("baseFee (Gwei):", hre.ethers.utils.formatUnits(baseFee, "gwei"), "Gwei");
  return {
    maxFeePerGas: baseFee.mul(2).add(maxPriority),
    maxPriorityFeePerGas: maxPriority
  };
}

async function getGasFee2() {
  const gasPrice = await hre.ethers.provider.getGasPrice();
  console.log("gasPrice:", gasPrice.toString());
  return { gasPrice };
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

