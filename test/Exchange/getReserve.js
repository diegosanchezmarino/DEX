const Factory = artifacts.require('./Factory.sol')
const Token = artifacts.require('./Token.sol')
const Exchange = artifacts.require('./Exchange.sol')

module.exports.getReserve = function (accounts) {


    let factory, exchange, token
    const startingTokenAmount = 1000
    const startingEtherAmount = 1000

    const deployer = accounts[0]
    const user = accounts[1]
    const extraAccount1 = accounts[2]

    describe('getReserve', async () => {

        var startBalanceOfResult, endBalanceOfResult
        var startGetReserveResult, endGetReserveResult

        before(async () => {

            factory = await Factory.new()
            token = await Token.new("A", "B")
            exchange = await Exchange.new(token.address)

            await token.getTokens(startingTokenAmount, { from: user })

            //Allow "Exchange" contract to transfer 1000 tokens from "deployer", otherwise "addLiquidity" will fail
            await token.approve(exchange.address, startingTokenAmount, { from: user })

            startBalanceOfResult = await token.balanceOf(exchange.address)

            startGetReserveResult = await exchange.getReserve({ from: user })

            addLiquidityResult = await exchange.addLiquidity(startingTokenAmount, { from: user, value: startingEtherAmount })

            var endBalanceOfResult = await token.balanceOf(exchange.address)

            var endGetReserveResult = await exchange.getReserve({ from: user })
        })

        it('getReserve returns the same value as token balance', async () => {

            assert.equal(startBalanceOfResult.toNumber(), startGetReserveResult.toNumber())

            assert.equal(endBalanceOfResult, endGetReserveResult)
        });

    })
}