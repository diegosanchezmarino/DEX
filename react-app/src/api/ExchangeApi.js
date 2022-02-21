import Exchange from '../abis/Exchange.json'
import { EnvValues } from '../utilities/Constants.js';
import Web3 from 'web3';


const exchangeContract = new (new Web3(window.ethereum)).eth.Contract(Exchange.abi, EnvValues.exchangeContractAddress)

export async function getTokenAmount(ethAmount) {
    const tokenAmount = await exchangeContract.methods.getTokenAmount(ethAmount).call()
    if (tokenAmount) {
        return tokenAmount
    }
    else {
        return ("Error getting token amount")
    }
}

export async function swapEthForToken(minToken, etherAmount, account) {
    const result = await exchangeContract.methods.ethToTokenSwap(minToken).send({ from: account, value: etherAmount })
    if (result) {
        return result
    }
    else {
        return ("Error")
    }
}