import Factory from '../abis/Factory.json'
import { EnvValues } from '../utilities/Constants.js';
import Web3 from 'web3';


const factoryContract = new (new Web3(window.ethereum)).eth.Contract(Factory.abi, EnvValues.factoryContractAddress)
const factoryContract = new (new Web3(window.ethereum)).eth.Contract(Factory.abi, EnvValues.factoryContractAddress)


export async function getExchange(address) {
    const exchangeAddres = await factoryContract.methods.getExchange(address).call()
    if (exchangeAddres) {
        return (exchangeAddres)
    }
    else {
        return ("Exchange doesn't exist")
    }
}



