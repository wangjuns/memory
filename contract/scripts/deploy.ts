import { ethers } from "hardhat";

async function main() {

  const MemoryContract = await ethers.getContractFactory("Memory");
  const lock = await MemoryContract.deploy("Haihe's Friends", "HH");

  await lock.deployed();

  //console.log(`Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
