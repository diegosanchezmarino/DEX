const { assert } = require('chai')
const { default: Web3 } = require('web3')

const Token = artifacts.require('./Token.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Token', ([deployer, user]) => {
    let token

    before(async () => {
        token = await Token.new("A", "B")
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

            assert.equal(name, "A")
            assert.equal(symbol, "B")
        });
    })

    describe('getTokens', async () => {

        let totalSupply, userBalance, updatedTotalSupply, updatedUserBalance
        const tokenToGet = 10000;

        before(async () => {


            totalSupply = await token.totalSupply()
            totalSupply = new web3.utils.BN(totalSupply)

            userBalance = await token.balanceOf(user)
            userBalance = new web3.utils.BN(userBalance)

            await token.getTokens(tokenToGet, { from: user })

            updatedTotalSupply = await token.totalSupply()
            updatedTotalSupply = new web3.utils.BN(updatedTotalSupply)

            updatedUserBalance = await token.balanceOf(user)
            updatedUserBalance = new web3.utils.BN(updatedUserBalance)

        })


        it("user gets expected tokens", async () => {

            assert.equal(userBalance.toString(), "0")

            assert.equal(updatedUserBalance.toString(), tokenToGet.toString())
        });

        it("supply gets updated", async () => {

            assert.equal(totalSupply.toString(), "0")

            assert.equal(updatedTotalSupply.toString(), tokenToGet.toString())
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