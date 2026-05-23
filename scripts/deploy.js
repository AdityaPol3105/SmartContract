const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying with wallet:", deployer.address);

  const Contract = await ethers.getContractFactory("ConfidentialVault");

  const contract = await Contract.deploy({
    gasLimit: 3000000,
  });

  await contract.waitForDeployment();

  console.log("Contract deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});