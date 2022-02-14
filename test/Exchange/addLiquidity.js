const Factory = artifacts.require('./Factory.sol')
const Token = artifacts.require('./Token.sol')
const Exchange = artifacts.require('./Exchange.sol')

module.exports.addLiquidity = function (accounts) {


    let factory, exchange, token
    const startingTokenAmount = 1000
    const startingEtherAmount = 1000

    const deployer = accounts[0]
    const user = accounts[1]
    const extraAccount1 = accounts[2]

    describe('addLiquidity', async () => {

        before(async () => {
            factory = await Factory.new()
            token = await Token.new("A", "B")
            exchange = await Exchange.new(token.address)

            await token.approve(exchange.address, 0, { from: user })
            await exchange.addLiquidity(0, { from: user, value: 0 })

        })


        it('allows 0 amounts', async () => {

            var updatedExchangeReserves = await exchange.getReserve()
            updatedExchangeReserves = new web3.utils.BN(updatedExchangeReserves)

            var updatedExchangeBalance = await web3.eth.getBalance(exchange.address);
            updatedExchangeBalance = new web3.utils.BN(updatedExchangeBalance)

            assert.equal("0", updatedExchangeReserves.toString())
            assert.equal("0", updatedExchangeBalance.toString())

        })

        describe('to empty pool', async () => {
            var startingUserTokens, startingUserLPTokens, startingExchangeSupply
            const userTokens = 500
            const userEther = 1000

            before(async () => {


                factory = await Factory.new()
                token = await Token.new("A", "B")
                exchange = await Exchange.new(token.address)

                await token.getTokens(startingTokenAmount, { from: user })
                //Allow "Exchange" contract to transfer 1000 tokens from "deployer", otherwise "addLiquidity" will fail
                await token.approve(exchange.address, startingTokenAmount, { from: user })

                startingUserTokens = await token.balanceOf(user)
                startingUserTokens = new web3.utils.BN(startingUserTokens)

                startingExchangeSupply = await exchange.totalSupply()

                startingUserLPTokens = await exchange.balanceOf(user)
                startingUserLPTokens = new web3.utils.BN(startingUserLPTokens)

                await exchange.addLiquidity(userTokens, { from: user, value: userEther })

            })

            it('user gets substracted the tokens', async () => {

                var updatedUserTokens = await token.balanceOf(user)
                updatedUserTokens = new web3.utils.BN(updatedUserTokens)

                assert.equal((startingTokenAmount - userTokens).toString(), updatedUserTokens.toString())

            })

            it('exchange reserves updates correctly', async () => {

                var updatedExchangeReserves = await exchange.getReserve()
                updatedExchangeReserves = new web3.utils.BN(updatedExchangeReserves)

                assert.equal(userTokens.toString(), updatedExchangeReserves.toString())

            })

            it('exchange balance updates correctly', async () => {

                var updatedExchangeBalance = await web3.eth.getBalance(exchange.address);
                updatedExchangeBalance = new web3.utils.BN(updatedExchangeBalance)

                assert.equal(userEther.toString(), updatedExchangeBalance.toString())

            })

            it('user gets correct LP Tokens', async () => {

                var updatedUserLPTokenBalance = await exchange.balanceOf(user)
                var expectedValue = await web3.eth.getBalance(exchange.address);

                assert.equal(expectedValue.toString(), updatedUserLPTokenBalance.toString())
            })

            it('supply gets updated', async () => {

                var exchangeSupplyBalance = await exchange.totalSupply()

                assert.equal(userEther.toString(), exchangeSupplyBalance.toString())
            })
        })





        describe('to previously created pool', async () => {

            var startingUserTokens, startingUserLPTokens, startingExchangeSupply
            const tokensForExtraAccount = 100
            const etherForExtraAccount = 10

            const userTokens = 300
            const userEther = 20

            before(async () => {


                factory = await Factory.new()
                token = await Token.new("A", "B")
                exchange = await Exchange.new(token.address)

                await token.getTokens(startingTokenAmount, { from: extraAccount1 })
                await token.getTokens(startingTokenAmount, { from: user })

                //Allow "Exchange" contract to transfer 1000 tokens from "deployer", otherwise "addLiquidity" will fail
                await token.approve(exchange.address, startingTokenAmount, { from: extraAccount1 })
                await token.approve(exchange.address, startingTokenAmount, { from: user })

                await exchange.addLiquidity(tokensForExtraAccount, { from: extraAccount1, value: etherForExtraAccount })

                startingExchangeReserves = await exchange.getReserve()
                startingExchangeSupply = await exchange.totalSupply()

                startingUserTokens = await token.balanceOf(user)
                startingUserLPTokens = await exchange.balanceOf(user)

                const addLiquidityResult = await exchange.addLiquidity(userTokens, { from: user, value: userEther })
            })

            it('user gets substracted the tokens', async () => {

                var updatedUserTokens = await token.balanceOf(user)
                var tokensTransferred = startingUserTokens - updatedUserTokens

                assert(tokensTransferred <= userTokens)

            })

            it('exchange reserves updates correctly', async () => {

                var updatedUserTokens = await token.balanceOf(user)

                var tokensTransferred = startingUserTokens.toNumber() - updatedUserTokens.toNumber()

                var updatedExchangeReserves = await exchange.getReserve()

                assert.equal(startingExchangeReserves.toNumber() + tokensTransferred, updatedExchangeReserves.toNumber())

            })

            it('exchange balance updates correctly', async () => {


                var updatedExchangeBalance = await web3.eth.getBalance(exchange.address);
                updatedExchangeBalance = new web3.utils.BN(updatedExchangeBalance)


                assert.equal((userEther + etherForExtraAccount).toString(), updatedExchangeBalance.toString())

            })

            it('user gets correct LP Tokens ', async () => {

                var updatedUserLPTokenBalance = await exchange.balanceOf(user)
                var exchangeBalance = await web3.eth.getBalance(exchange.address);

                var expectedValue = (userEther * startingExchangeSupply.toNumber()) / (exchangeBalance - userEther);

                assert.equal(expectedValue.toString(), updatedUserLPTokenBalance.toString())
            })

            it('supply gets updated', async () => {

                var exchangeSupplyBalance = await exchange.totalSupply()
                var updatedUserLPTokenBalance = await exchange.balanceOf(user)

                assert.equal((startingExchangeSupply.toNumber() + updatedUserLPTokenBalance.toNumber()).toString(), exchangeSupplyBalance.toString())
            })

            it('fails when not enough tokens', async () => {

                await exchange.addLiquidity(190, { from: user, value: userEther }).should.be.rejected;

            })
        })
    })
}


