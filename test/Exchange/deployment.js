
const Factory = artifacts.require('./Factory.sol')
const Token = artifacts.require('./Token.sol')
const Exchange = artifacts.require('./Exchange.sol')

module.exports.deployment = function (accounts) {

    describe('deployment', async () => {

        let factory, exchange, token
        const startingTokenAmount = 1000
        const startingEtherAmount = 1000

        const deployer = accounts[0]
        const user = accounts[1]
        const extraAccount1 = accounts[2]

        before(async () => {
            factory = await Factory.new()
            token = await Token.new()
            exchange = await Exchange.new(token.address)
        })

        it('deploys successfully', async () => {
            const address = await exchange.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('name is correct', async () => {
            const exchangeName = await exchange.name()
            assert.equal(exchangeName, "MyExchange")
        })
        it('symbol is correct', async () => {
            const exchangeSymbol = await exchange.symbol()
            assert.equal(exchangeSymbol, "MEX")
        })
    })
}
