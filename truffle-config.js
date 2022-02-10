
import { ROPSTEN_PRIVATE_KEY, INFURA_API_KEY, MNENOMIC } from './secrets'


module.exports = {
  networks: {
    develop: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "5777" // Match any network id
    },
    ropsten: {
      provider: () => new HDWalletProvider(MNENOMIC, "https://ropsten.infura.io/v3/" + INFURA_API_KEY),
      network_id: "3",
      gas: 3000000
    },
  },
  contracts_directory: './contracts/',
  contracts_build_directory: './react-app/src/abis',
  compilers: {
    solc: {
      version: "0.8.11",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
