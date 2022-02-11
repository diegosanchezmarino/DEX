const { ROPSTEN_PRIVATE_KEY, INFURA_API_KEY } = require('./secrets')



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
      accounts: [`${ROPSTEN_PRIVATE_KEY}`]
    }
  }
};