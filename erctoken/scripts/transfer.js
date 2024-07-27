const hre = require("hardhat");
const { encryptDataField } = require("@swisstronik/utils");

const sendShieldedTransaction = async (signer, destination, data, value) => {
    const rpclink = hre.network.config.url;
    const [encryptedData] = await encryptDataField(rpclink, data);
    return await signer.sendTransaction({
      from: signer.address,
      to: destination,
      data: encryptedData,
      value,
    });
  };
  
  async function main() {

    const contractAddress = "0xf208C10CD1dF573AA9036F371c16EdE3Ac005600"; 
  
    const recipient = "0x16af037878a6cAce2Ea29d39A3757aC2F6F7aac1"; 
  
   
  
    const [signer] = await ethers.getSigners();
    const contractFactory = await ethers.getContractFactory("FinisherToken");
    const contract = contractFactory.attach(contractAddress);

    const amount = 1;
  
    // Encode the transfer function call
    const functionName = "transfer";
    const transferData = contract.interface.encodeFunctionData(functionName, [recipient, amount.toString()]);
  
    // Send the shielded transaction
    const transferTx = await sendShieldedTransaction(signer, contractAddress, transferData, 0);
    await transferTx.wait();
    
    console.log("Transaction Response: ", `Transfer token has been success! Transaction hash: https://explorer-evm.testnet.swisstronik.com/tx/${transferTx.hash}`);
    // console.log("Transaction Receipt: ", transferTx);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });