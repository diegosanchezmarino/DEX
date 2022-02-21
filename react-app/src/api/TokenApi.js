import Token from '../abis/Token.json'
import { EnvValues } from '../utilities/Constants.js';
import Web3 from 'web3';


const tokenContract = new (new Web3(window.ethereum)).eth.Contract(Token.abi, EnvValues.tokenContractAddress)

export async function getTokens(tokenAmount, account) {
    const result = await tokenContract.methods.getTokens(tokenAmount).send({ from: account })
    if (result) {
        return result
    }
    else {
        return ("Error getting tokens")
    }
}

