import detectEthereumProvider from '@metamask/detect-provider';
import { EnvValues } from './Constants'

import { MetamaskStatus } from '../App'

export class BlockchainConnectionManager {


    constructor(updateState) {
        this.updateState = updateState
    }


    async validate() {
        this.checkMetamask()
    }



    async checkMetamask() {

        this.provider = await detectEthereumProvider();
        if (this.provider) {
            console.log('Metamask is installed')
            this.checkNetwork()
        } else {
            this.updateState({ isMetamaskInstalled: MetamaskStatus.NotInstalled })
            console.log('Metamask not installed');
        }

    }

    async checkNetwork() {

        await window.ethereum.request({ method: 'eth_chainId' }).then((result) => {
            const chainIdDecimal = parseInt(result, 16);
            console.log("Current chain id: " + result + " (" + chainIdDecimal + ")")
            if (chainIdDecimal !== EnvValues.chainId) {
                this.updateState({ metamaskStatus: MetamaskStatus.WrongNetwork })
            }
            else {
                this.checkConnection()
            }
        }).catch((error) => {
            console.log(error)
        });

        window.ethereum.on('chainChanged', (result) => {
            const chainIdDecimal = parseInt(result, 16);
            console.log("Chain changed, new chain id: " + chainIdDecimal)
            if (chainIdDecimal === EnvValues.chainId) {
                this.checkConnection()
            }
            else {
                this.updateState({ metamaskStatus: MetamaskStatus.WrongNetwork })
            }
        });
    }

    async checkConnection() {

        await window.ethereum
            .request({ method: 'eth_accounts' })
            .then((result) => {

                if (result.length === 0) {
                    console.log('Metamask is not connected')
                    this.updateState({ metamaskStatus: MetamaskStatus.NotConnected })
                }
                else {
                    console.log('Metamask is connected to account' + result[0])
                    this.loadAccount(result[0])
                }
            })
            .catch((err) => {
                console.error(err);
            });

        window.ethereum.on('accountsChanged', (result) => {
            console.log("Account changed event")
            if (result.length === 0) {
                console.log('User has disconnected all accounts')
                this.updateState({ metamaskStatus: MetamaskStatus.NotConnected, account: '' })
            }
            else {
                console.log('User changed account')
                this.loadAccount(result[0])
            }
        });

    }


    async loadAccount(account) {
        console.log("Account: " + account + " loaded")
        this.updateState({ metamaskStatus: MetamaskStatus.Ready, account })
    }

}



export async function connectWallet() {
    window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result) => {
        })
        .catch((err) => {
            if (err.code === 4001) {
                // EIP-1193 userRejectedRequest error
                // If this happens, the user rejected the connection request.
                console.log('Please connect to MetaMask.');
            } else {
                console.error(err);
            }
        });
}


export async function switchNetwork() {

    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: EnvValues.chainIdHexa }], // chainId must be in hexadecimal numbers
        }).then((result) => {
            console.log(result)
        }).catch((err) => {
            console.log(err)
        });
    }
    catch (switchError) {
        console.log(switchError)
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{ chainId: '0xf00', rpcUrl: 'https://...' /* ... */ }],
                });
            } catch (addError) {
                // handle "add" error
            }
        }
        // handle other "switch" errors
    }
}