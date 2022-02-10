import Decentragram from '../abis/Decentragram.json'
import * as Constants from '../utilities/Constants';
import Web3 from 'web3';


const mainContract = new (new Web3(window.ethereum)).eth.Contract(Decentragram.abi, Constants.DecentragramContractAddress)



