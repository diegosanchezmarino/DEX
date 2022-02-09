const { assert } = require("chai")

const Factory = artifacts.require('./Factory.sol')
const Token = artifacts.require('./Token.sol')
const Exchange = artifacts.require('./Exchange.sol')


module.exports.tokenToEthSwap = function (accounts) {



    let factory, exchange, token
    const startingTokenAmount = 1000
    const startingEtherAmount = 1000

    const deployer = accounts[0]
    const user = accounts[1]
    const extraAccount1 = accounts[2]

    describe('tokenToEthSwap', async () => {

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

        it('fails if no tokens are sent', async () => {

            await exchange.tokenToEthSwap(0, 10).should.be.rejectedWith('not enough tokens')

        });

        it('fails if user owns no tokens', async () => {

            var userTokensAmount = await token.balanceOf(user)
            userTokensAmount = new web3.utils.BN(userTokensAmount)

            assert.equal(0, userTokensAmount.toNumber())
            await exchange.tokenToEthSwap(0, 10).should.be.rejectedWith('not enough tokens')
        });

        it('fails for higher tokenMin', async () => {

            const tokensToSell = 200

            var ethAmountResult = await exchange.getEthAmount(tokensToSell)
            ethAmountResult = new web3.utils.BN(ethAmountResult)

            const minEth = 300

            assert.isAbove(minEth, ethAmountResult.toNumber(), "the minEths amount is less than the expected")
            await exchange.tokenToEthSwap(tokensToSell, minEth).should.be.rejectedWith("insufficient output amount")

        });

        it('user gets expected ether', async () => {


            const tokensToSell = 100
            const minEth = 20

            await token.approve(exchange.address, tokensToSell, { from: user })
            await token.transfer(user, tokensToSell, { from: deployer })


            var ethAmountResult = await exchange.getEthAmount(tokensToSell)
            ethAmountResult = new web3.utils.BN(ethAmountResult)


            var startingUserEther = await web3.eth.getBalance(user);
            startingUserEther = new web3.utils.BN(startingUserEther)

            var swap = await exchange.tokenToEthSwap(tokensToSell, minEth, { from: user })
            const swapTx = await web3.eth.getTransaction(swap.tx);

            var gasConsumption = swap.receipt.gasUsed * swapTx.gasPrice
            gasConsumption = new web3.utils.BN(gasConsumption)

            var updatedUserEther = await web3.eth.getBalance(user);
            updatedUserEther = new web3.utils.BN(updatedUserEther)

            assert.isAbove(ethAmountResult.toNumber(), minEth, "user received less ether than min setted")
            assert.equal(startingUserEther.add(ethAmountResult).toString(), updatedUserEther.add(gasConsumption).toString(), "user did't get the expected ether's amount")
        });


    })


}