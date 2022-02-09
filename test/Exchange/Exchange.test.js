const { assert } = require('chai')
const { default: Web3 } = require('web3')

const { deployment } = require('./deployment')
const { addLiquidity } = require('./addLiquidity')
const { getReserve } = require('./getReserve')
const { removeLiquidity } = require('./removeLiquidity')
const { getAmount } = require('./getAmount')
const { getEthAmount } = require('./getEthAmount')
const { getTokenAmount } = require('./getTokenAmount')
const { ethToTokenSwap } = require('./ethToTokenSwap')
const { tokenToEthSwap } = require('./tokenToEthSwap')


require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Exchange', (accounts) => {

    deployment(accounts)
    addLiquidity(accounts)
    getReserve(accounts)
    removeLiquidity(accounts)
    getAmount(accounts)
    getEthAmount(accounts)
    getTokenAmount(accounts)
    ethToTokenSwap(accounts)
    tokenToEthSwap(accounts)
})