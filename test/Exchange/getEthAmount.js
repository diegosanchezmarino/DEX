const { assert } = require("chai")

const Factory = artifacts.require('./Factory.sol')
const Token = artifacts.require('./Token.sol')
const Exchange = artifacts.require('./Exchange.sol')


module.exports.getEthAmount = function (accounts) {



    let factory, exchange, token
    const startingTokenAmount = 1000
    const startingEtherAmount = 1000

    const deployer = accounts[0]
    const user = accounts[1]
    const extraAccount1 = accounts[2]

    describe('getEthAmount', async () => {

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

        it('fails for 0 as input', async () => {

            await exchange.getEthAmount(0).should.be.rejectedWith('tokenSold is too small')

        });


        it('returns same value as getAmount', async () => {

            const inputAmountValue = 50

            var getEthAmountResult = await exchange.getEthAmount(inputAmountValue)
            getEthAmountResult = new web3.utils.BN(getEthAmountResult)


            var reserves = await exchange.getReserve()
            reserves = new web3.utils.BN(reserves)

            var exchangeBalance = await web3.eth.getBalance(exchange.address);
            exchangeBalance = new web3.utils.BN(exchangeBalance)


            var getAmountResult = await exchange.getAmount(inputAmountValue, reserves.toNumber(), exchangeBalance.toNumber())
            getAmountResult = new web3.utils.BN(getAmountResult)


            assert.equal(getEthAmountResult.toNumber(), getAmountResult.toNumber())

        });

    })


}