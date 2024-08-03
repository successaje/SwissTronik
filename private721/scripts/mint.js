const hre = require("hardhat");


const { encryptDataField } = require("@swisstronik/utils");

const sendShieldedTransaction = async (signer, destination, data, value) => {
  const rpcLink = hre.network.config.url;
  const [encryptedData] = await encryptDataField(rpcLink, data);
  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  const contractAddress = "0x139af4867Fd2eDf9c68198A14b8F517ACF7Db481"

//   const recipientAddress  = 0xA69389f2DB3CE780aE853c5cD4bbDF0187BE4786

  const [signer] = await ethers.getSigners();
  const contractFactory = await ethers.getContractFactory("FinisherNFT");
  const contract = contractFactory.attach(contractAddress);
  const functionName = "mint";
  const tokenId = 1;

  const mintData = contract.interface.encodeFunctionData(functionName, [signer.address, tokenId]);
  const safeMintTx = await sendShieldedTransaction(
    signer,
    contractAddress,
    mintData,
    0
  );
  await safeMintTx.wait();
  console.log("Transaction Receipt: ", `Minting NFT has been success! Transaction hash: https://explorer-evm.testnet.swisstronik.com/tx/${safeMintTx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});