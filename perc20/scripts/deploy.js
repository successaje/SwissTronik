const hre = require("hardhat");

async function main() {

  const FinisherToken = await hre.ethers.getContractFactory("FinisherToken");

  const finisherToken = await FinisherToken.deploy(1000000);

  await finisherToken.waitForDeployment();

  console.log(`FinisherToken contract deployed to ${finisherToken.target}`);
}

//DEFAULT BY HARDHAT:
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});