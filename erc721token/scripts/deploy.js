const hre = require("hardhat");
const fs = require("fs");

async function main() {

  const finisherNFT = await hre.ethers.deployContract("FinisherNFT");

  await finisherNFT.waitForDeployment();

  const deployedContract = await finisherNFT.getAddress();

  console.log(`Contract deployed to ${deployedContract}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});