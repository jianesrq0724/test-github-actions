const hre = require("hardhat");
import { expect } from 'chai';

let privateKey = "6a93f5564cc41d1ae78d13274520f0bfed80935cfcad03ffd4003ec450b61817"

async function main() {
  console.log('network:', (await hre.ethers.provider.getNetwork()).name, (await hre.ethers.provider.getNetwork()).chainId);

  const deployer = new hre.ethers.Wallet(privateKey, hre.ethers.provider);

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  // 加载GAS费
  async function getGasFee() {
    let maxPriority = hre.ethers.utils.parseUnits("30", 9);
    let baseFee = (await hre.ethers.provider.getBlock()).baseFeePerGas;
    return {
      maxFeePerGas: baseFee.mul(2).add(maxPriority),
      maxPriorityFeePerGas: maxPriority
    };
  }

  const LManagement = await hre.ethers.getContractFactory("Bank");
  const lManagement = await LManagement.connect(deployer).deploy(await getGasFee());

  console.log("Dex deployed to:", lManagement.address);

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

