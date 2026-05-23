const hre = require("hardhat");
const { expect } = require("chai");
const { Encryptable, FheTypes } = require("@cofhe/sdk");

describe("ConfidentialVault", function () {
 let client;

 before(async () => {
 const [signer] = await hre.ethers.getSigners();
 client = await hre.cofhe.createClientWithBatteries(signer);
 });

 it("should store and decrypt balance", async () => {
 const Factory = await hre.ethers.getContractFactory("ConfidentialVault");
 const vault = await Factory.deploy();

 const [encrypted] = await client
 .encryptInputs([Encryptable.uint64(100n)])
 .execute();

 await vault.deposit(encrypted);

 const ctHash = await vault.getBalance();

 const balance = await client
 .decryptForView(ctHash, FheTypes.Uint64)
 .execute();

 expect(balance).to.equal(100n);
 });
});