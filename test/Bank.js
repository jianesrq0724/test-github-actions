const { ethers } = require("hardhat");
const { expect } = require("chai");
const { constants } = require("ethers");

describe("TestBankContract", function () {
  let bank;
  let owner;
  let addr1;
  let connectAddr1

  // 部署合约
  before(async function () {
    [owner, addr1] = await ethers.getSigners();
    const Bank = await ethers.getContractFactory("Bank");
    bank = await Bank.deploy();
    await bank.deployed();
    connectAddr1 = bank.connect(addr1);
  });

  // 测试存款功能
  it("should allow deposits and track balances", async function () {
    const depositValue = ethers.utils.parseEther("1.0");
    const tx = await connectAddr1.deposit({ value: depositValue });
    await tx.wait();
    const finalDepositValue = await bank.deposits(addr1.address);
    finalDepositValue = finalDepositValue - 1;
    expect(finalDepositValue).to.equal(depositValue);
    
  });

  // 测试取款功能
  it("should allow withdrawals and reset balances", async function () {

    const initBalance = await addr1.getBalance();
    const tx = await connectAddr1.withdraw();
    const receipt = await tx.wait();
    const { gasUsed } = receipt;
    const txCost = gasUsed.mul(receipt.effectiveGasPrice)

    const finalBalance = await addr1.getBalance();

    expect(finalBalance.add(txCost)).to.be.equal(initBalance.add(ethers.utils.parseEther("1.0")));

    expect(await bank.deposits(addr1.address)).to.be.equal("0");

  });

});

