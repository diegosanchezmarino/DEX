import Factory from '../abis/Factory.json'
import Exchange from '../abis/Exchange.json'
import { EnvValues } from '../utilities/Constants.js';
import Web3 from 'web3';


const factoryContract = new (new Web3(window.ethereum)).eth.Contract(Factory.abi, EnvValues.factoryContractAddress)
const exchangeContract = new (new Web3(window.ethereum)).eth.Contract(Exchange.abi, EnvValues.exchangeContractAddress)
const web3 = new Web3(window.ethereum)

export async function getExchange(address) {
    const exchangeAddres = await factoryContract.methods.getExchange(address).call()
    if (exchangeAddres) {
        return (exchangeAddres)
    }
    else {
        return ("Exchange doesn't exist")
    }
}


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

export async function getAddressBalance(address) {
    const result = web3.eth.getBalance(address)
    if (result) {
        return result
    }
    else {
        return ("Error getting account balance")
    }
}


