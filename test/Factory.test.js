const { assert } = require('chai')
const { default: Web3 } = require('web3')

const Factory = artifacts.require('./Factory.sol')
const Token = artifacts.require('./Token.sol')




require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Factory', ([deployer]) => {
    let factory, token, createExchangeResult, createExchangeEvent, getExchangeResult, tokenToExchangeResult

    before(async () => {
        factory = await Factory.new()
        token = await Token.new("A", "B")
        createExchangeResult = await factory.createExchange(token.address);
        createExchangeEvent = createExchangeResult.logs[0].args
        getExchangeResult = await factory.getExchange(token.address);
        tokenToExchangeResult = await factory.tokenToExchange(token.address);

    })


    describe('deployment', async () => {

        it('deploys successfully', async () => {
            const address = await factory.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })
    })

    describe("createExchange", () => {

        it("deploys an exchange", async () => {

            assert.equal(createExchangeEvent.exchangeAddress, getExchangeResult, "Exchange address doesn't match stored in contract")
            assert.equal(createExchangeEvent.tokenAddress, token.address, "ExchangeToken address doesn't match stored in contract")

        });


        it("doesn't allow zero address", async () => {
            await factory.createExchange("0x0000000000000000000000000000000000000000").should.be.rejected;
        });

        it("fails when exchange exists", async () => {
            await factory.createExchange(token.address).should.be.rejected;
        });
    })

    describe("getExchange", () => {


        it("returns exchange address", async () => {

            assert.equal(createExchangeEvent.exchangeAddress, getExchangeResult)
        });

        it("match value stored in contract", async () => {

            assert.equal(tokenToExchangeResult, getExchangeResult)
        });

        it("returns 0x0 address for non-existent exchanges", async () => {

            const result = await factory.getExchange("0x0000000000000000000000000000000000000000");

            assert.equal(result, "0x0000000000000000000000000000000000000000", "Exchange address should be 0x0000000000000000000000000000000000000000")
        });

    })

})
