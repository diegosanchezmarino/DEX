const Factory = artifacts.require('./Factory.sol')
const Token = artifacts.require('./Token.sol')
const Exchange = artifacts.require('./Exchange.sol')


module.exports.removeLiquidity = function (accounts) {



    let factory, exchange, token
    const startingTokenAmount = 1000
    const startingEtherAmount = 1000

    const deployer = accounts[0]
    const user = accounts[1]
    const extraAccount1 = accounts[2]


    describe('removeLiquidity', async () => {

        var startingUserTokens, startingUserEther, startingUserLPTokens, startingExchangeSupply, removeLiquidityResult, addLiquidityResult
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

            startingUserEther = await web3.eth.getBalance(user);


            addLiquidityResult = await exchange.addLiquidity(userTokens, { from: user, value: userEther })

            startingUserLPTokens = await exchange.balanceOf(user)
            startingUserLPTokens = new web3.utils.BN(startingUserLPTokens)

            removeLiquidityResult = await exchange.removeLiquidity(startingUserLPTokens, { from: user })

        })
        it('user LP Tokens balance should be 0', async () => {


            var currentLPTokens = await exchange.balanceOf(user)
            currentLPTokens = new web3.utils.BN(currentLPTokens)


            assert.equal(0, currentLPTokens.toNumber())

        });

        it('totalSupply should be 0', async () => {


            var totalSupply = await exchange.totalSupply()
            totalSupply = new web3.utils.BN(totalSupply)


            assert.equal(0, totalSupply.toNumber())

        });

        it('user get tokens', async () => {


            var currentUserTokens = await token.balanceOf(user)
            currentUserTokens = new web3.utils.BN(currentUserTokens)


            assert.equal(startingTokenAmount, currentUserTokens.toNumber())

        });

        it('exchange reserves updates correctly', async () => {


            var currentExchangeReserves = await exchange.getReserve()
            currentExchangeReserves = new web3.utils.BN(currentExchangeReserves)


            assert.equal(0, currentExchangeReserves.toNumber())

        });
        it('user ether should be same as added', async () => {


            var currentUserEther = await web3.eth.getBalance(user);
            currentUserEther = new web3.utils.BN(currentUserEther)

            const addLiquidityTx = await web3.eth.getTransaction(addLiquidityResult.tx);
            const removeLiquidityTx = await web3.eth.getTransaction(removeLiquidityResult.tx);

            const addLiquidityGasUsage = (addLiquidityTx.gasPrice * addLiquidityResult.receipt.gasUsed)
            const removeLiquidityGasUsage = (removeLiquidityTx.gasPrice * removeLiquidityResult.receipt.gasUsed)

            var totalGasCost = addLiquidityGasUsage + removeLiquidityGasUsage
            totalGasCost = new web3.utils.BN(totalGasCost)

            assert.equal(currentUserEther.add(totalGasCost), startingUserEther)

        });

        it('sending 0 tokens should fail', async () => {

            await exchange.removeLiquidity(0, { from: user }).should.be.rejectedWith("invalid amount");

        });

        it('not enough LP Tokens should fail', async () => {

            await exchange.removeLiquidity(10, { from: user }).should.be.rejectedWith("not enough tokens");

        });

    })
}
