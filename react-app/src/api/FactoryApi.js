import Factory from '../abis/Factory.json'
import { EnvValues } from '../utilities/Constants.js';
import Web3 from 'web3';


const factoryContract = new (new Web3(window.ethereum)).eth.Contract(Factory.abi, EnvValues.factoryContractAddress)
const web3 = new Web3(window.ethereum)

export async function getExchange(tokenAddress) {
    const exchangeAddres = await factoryContract.methods.getExchange(tokenAddress).call()
    if (exchangeAddres) {
        return (exchangeAddres)
    }
    else {
        return ("Exchange doesn't exist")
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


