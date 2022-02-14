const { assert } = require("chai")

const Factory = artifacts.require('./Factory.sol')
const Token = artifacts.require('./Token.sol')
const Exchange = artifacts.require('./Exchange.sol')


module.exports.getAmount = function (accounts) {



    let factory, exchange, token
    const startingTokenAmount = 1000
    const startingEtherAmount = 1000

    const deployer = accounts[0]
    const user = accounts[1]
    const extraAccount1 = accounts[2]

    describe('getAmount', async () => {

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

        it('fails if reserves are empty', async () => {

            await exchange.getAmount(100, 0, 0).should.be.rejectedWith("invalid reserves")

        });

        it('returns 0 if inputAmount is 0', async () => {

            var getAmountResult = await exchange.getAmount(0, 100, 100)
            getAmountResult = new web3.utils.BN(getAmountResult)

            assert.equal(getAmountResult.toString(), "0")

        });

        it('increasing input should increase output', async () => {

            const inputAmount = 10

            var firstResult = await exchange.getAmount(inputAmount, 100, 200)
            firstResult = new web3.utils.BN(firstResult)

            var secondResult = await exchange.getAmount(inputAmount * 3, 100, 200)
            secondResult = new web3.utils.BN(secondResult)

            var thirdResult = await exchange.getAmount(inputAmount * 9, 100, 200)
            thirdResult = new web3.utils.BN(thirdResult)

            var fourthResult = await exchange.getAmount(inputAmount * 27, 100, 200)
            fourthResult = new web3.utils.BN(fourthResult)

            assert.isAbove(secondResult.toNumber(), firstResult.toNumber())
            assert.isAbove(firstResult.toNumber() * 3, secondResult.toNumber())

            assert.isAbove(thirdResult.toNumber(), secondResult.toNumber())
            assert.isAbove(secondResult.toNumber() * 3, thirdResult.toNumber())


            assert.isAbove(fourthResult.toNumber(), thirdResult.toNumber())
            assert.isAbove(thirdResult.toNumber() * 3, fourthResult.toNumber())
        });


    })


}