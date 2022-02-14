const { assert } = require("chai")

const Factory = artifacts.require('./Factory.sol')
const Token = artifacts.require('./Token.sol')
const Exchange = artifacts.require('./Exchange.sol')


module.exports.ethToTokenSwap = function (accounts) {



    let factory, exchange, token
    const startingTokenAmount = 1000
    const startingEtherAmount = 1000

    const deployer = accounts[0]
    const user = accounts[1]
    const extraAccount1 = accounts[2]

    describe('ethToTokenSwap', async () => {

        const userTokens = 500
        const userEther = 1000

        before(async () => {


            factory = await Factory.new()
            token = await Token.new("A", "B")
            exchange = await Exchange.new(token.address)

            await token.getTokens(startingTokenAmount, { from: extraAccount1 })
            //Allow "Exchange" contract to transfer 1000 tokens from "deployer", otherwise "addLiquidity" will fail
            await token.approve(exchange.address, startingTokenAmount, { from: extraAccount1 })

            await exchange.addLiquidity(userTokens, { from: extraAccount1, value: userEther })
        })

        it('fails if no ether is sent', async () => {

            await exchange.ethToTokenSwap(10, { value: 0 }).should.be.rejectedWith('not enough ether')

        });


        it('fails for higher tokenMin', async () => {


            var tokenAmountResult = await exchange.getTokenAmount(500)
            tokenAmountResult = new web3.utils.BN(tokenAmountResult)

            const minToken = 300

            assert.isAbove(minToken, tokenAmountResult.toNumber(), "the minTokens amount is less than the expected")
            await exchange.ethToTokenSwap(minToken, { value: 500, from: user }).should.be.rejectedWith("insufficient output amount")

        });

        it('user gets expected tokens', async () => {


            var tokenAmountResult = await exchange.getTokenAmount(500)
            tokenAmountResult = new web3.utils.BN(tokenAmountResult)

            var startingUserTokens = await token.balanceOf(user)
            startingUserTokens = new web3.utils.BN(startingUserTokens)

            const minToken = 150

            await exchange.ethToTokenSwap(minToken, { value: 500, from: user })

            var updatedUserTokens = await token.balanceOf(user)
            updatedUserTokens = new web3.utils.BN(updatedUserTokens)

            assert.equal(startingUserTokens.toNumber(), 0, "user already had some tokens")
            assert.equal(tokenAmountResult.toNumber(), updatedUserTokens.toNumber(), "user did't get the expected token's amount")
        });


    })


}