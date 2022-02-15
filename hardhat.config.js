const { PRIVATE_KEY, INFURA_API_KEY } = require('./secrets')



require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-truffle5");
/**
 * @type import('hardhat/config').HardhatUserConfig
 */




module.exports = {
  solidity: "0.8.11",
  networks: {
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [`${PRIVATE_KEY}`]
    },
    develop: {
      url: 'http://127.0.0.1:8545',
      network_id: "5777", // Match any network id
      accounts: [`${PRIVATE_KEY}`]
    },
  }
};