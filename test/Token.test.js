const { assert } = require('chai')
const { default: Web3 } = require('web3')

const Token = artifacts.require('./Token.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Token', ([deployer]) => {
    let token

    before(async () => {
        token = await Token.deployed()
    })


    describe('deployment', async () => {

        it('deploys successfully', async () => {
            const address = await token.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it("check name, symbol and supply", async () => {
            const name = await token.name()
            const symbol = await token.symbol()

            assert.equal(name, "Ramona")
            assert.equal(symbol, "MONA")
        });

        it("mints initialSupply to msg.sender when created", async () => {

            const expectedSupply = 1000000000000000000;

            let totalSupply = await token.totalSupply()
            totalSupply = new web3.utils.BN(totalSupply)

            let deployerBalance = await token.balanceOf(deployer)
            deployerBalance = new web3.utils.BN(deployerBalance)

            assert.equal(totalSupply.toString(), expectedSupply.toString())
            assert.equal(deployerBalance.toString(), expectedSupply.toString())
        });
    })

})















// const { expect } = require("chai");

// describe("Token", () => {
//     let owner;
//     let token;

//     before(async () => {
//         [owner] = await ethers.getSigners();

//         const Token = await ethers.getContractFactory("Token");
//         token = await Token.deploy("Test Token", "TKN", 31337);
//         await token.deployed();
//     });

//     it("sets name and symbol when created", async () => {
//         expect(await token.name()).to.equal("Test Token");
//         expect(await token.symbol()).to.equal("TKN");
//     });

//     it("mints initialSupply to msg.sender when created", async () => {
//         expect(await token.totalSupply()).to.equal(31337);
//         expect(await token.balanceOf(owner.address)).to.equal(31337);
//     });
// });