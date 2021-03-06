
const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const Factory = await hre.ethers.getContractFactory("Factory");
    const Token = await hre.ethers.getContractFactory("Token");


    const factory = await Factory.deploy();
    const token = await Token.deploy("DexInstaCoin", "DINSTA");

    console.log("Factory address:", factory.address);
    console.log("Token address:", token.address);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });