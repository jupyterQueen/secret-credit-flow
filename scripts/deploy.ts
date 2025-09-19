import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploy SecretCreditFlow contract
  const SecretCreditFlow = await ethers.getContractFactory("SecretCreditFlow");
  
  // Set verifier address (can be deployer for testing)
  const verifierAddress = deployer.address;
  
  const secretCreditFlow = await SecretCreditFlow.deploy(verifierAddress);
  await secretCreditFlow.deployed();

  console.log("SecretCreditFlow deployed to:", secretCreditFlow.address);
  
  // Save deployment info
  const deploymentInfo = {
    network: "sepolia",
    contractAddress: secretCreditFlow.address,
    verifierAddress: verifierAddress,
    deployerAddress: deployer.address,
    deploymentTime: new Date().toISOString(),
    transactionHash: secretCreditFlow.deployTransaction.hash
  };
  
  console.log("Deployment info:", JSON.stringify(deploymentInfo, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
