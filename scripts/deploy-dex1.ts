const hre = require("hardhat");
import { expect } from 'chai';

let privateKey = "6c0de25402cec4acd2b2b6dbadf9a5fed635aa2995f765de28155a0827fe6af4"
// 0xb8e3d12b9517358a74492b6316877ea409ffffff

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
    let maxPriority = hre.ethers.utils.parseUnits("5", 9);
    let baseFee = (await hre.ethers.provider.getBlock()).baseFeePerGas;
    return {
      maxFeePerGas: baseFee.mul(2).add(maxPriority),
      maxPriorityFeePerGas: maxPriority
    };
  }

  const DexFactory = await hre.ethers.getContractFactory("Dex");
  const Dex = await DexFactory.connect(deployer).deploy("0x0f1c2d1fdd202768a4bda7a38eb0377bd58d278e", await getGasFee());

  console.log("Dex deployed to:", Dex.address.toLowerCase());

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

