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
    const maxPriority = await hre.ethers.provider.send("eth_maxPriorityFeePerGas", []);
    const baseFee = (await hre.ethers.provider.getBlock("latest")).baseFeePerGas;
    return {
      maxFeePerGas: baseFee.mul(2).add(maxPriority),
      maxPriorityFeePerGas: maxPriority
    };
  }

  const { maxFeePerGas, maxPriorityFeePerGas } = await getGasFee();

  const Dex2Factory = await hre.ethers.getContractFactory("Dex2");

  const { chainId } = await hre.ethers.provider.getNetwork();
  let factoryAddress, wethAddress;

  if (chainId === 137) { // Polygon
    factoryAddress = "0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32";
    wethAddress = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270";
  } else if (chainId === 128) { // heco
    factoryAddress = "0xb0b670fc1f7724119963018db0bfa86adb22d941";
    wethAddress = "0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f";
  } else {
    throw new Error(`Unsupported network with chainId ${chainId}`);
  }


  // factory  WETH
  const Dex2 = await Dex2Factory.connect(deployer).deploy(factoryAddress, wethAddress, { maxFeePerGas, maxPriorityFeePerGas, gasLimit: 3000000 });

  console.log("Dex2 deployed to:", Dex2.address.toLowerCase());

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

