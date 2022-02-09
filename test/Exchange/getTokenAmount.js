const { assert } = require("chai")

const Factory = artifacts.require('./Factory.sol')
const Token = artifacts.require('./Token.sol')
const Exchange = artifacts.require('./Exchange.sol')


module.exports.getTokenAmount = function (accounts) {



    let factory, exchange, token
    const startingTokenAmount = 1000
    const startingEtherAmount = 1000

    const deployer = accounts[0]
    const user = accounts[1]
    const extraAccount1 = accounts[2]

    describe('getTokenAmount', async () => {

        const userTokens = 500
        const userEther = 1000

        before(async () => {


            factory = await Factory.new()
            token = await Token.new()
            exchange = await Exchange.new(token.address)

            await token.transfer(extraAccount1, startingTokenAmount, { from: deployer })
            //Allow "Exchange" contract to transfer 1000 tokens from "deployer", otherwise "addLiquidity" will fail
            await token.approve(exchange.address, startingTokenAmount, { from: extraAccount1 })

            await exchange.addLiquidity(userTokens, { from: extraAccount1, value: userEther })
        })


        it('fails for 0 as input', async () => {

            await exchange.getTokenAmount(0).should.be.rejectedWith('ethSold is too small')

        });



        it('returns same value as getAmount', async () => {

            const inputAmountValue = 100

            var getEthAmountResult = await exchange.getTokenAmount(inputAmountValue)
            getEthAmountResult = new web3.utils.BN(getEthAmountResult)


            var reserves = await exchange.getReserve()
            reserves = new web3.utils.BN(reserves)

            var exchangeBalance = await web3.eth.getBalance(exchange.address);
            exchangeBalance = new web3.utils.BN(exchangeBalance)


            var getAmountResult = await exchange.getAmount(inputAmountValue, exchangeBalance.toNumber(), reserves.toNumber())
            getAmountResult = new web3.utils.BN(getAmountResult)


            assert.equal(getEthAmountResult.toNumber(), getAmountResult.toNumber())

        });


    })


}