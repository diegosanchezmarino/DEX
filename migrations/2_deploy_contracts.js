




const Token = artifacts.require("Token");
const Factory = artifacts.require("Factory");
const Exchange = artifacts.require("Exchange");

module.exports = function (deployer) {

    // deployer.deploy(Token)

    deployer.deploy(Factory)
    deployer.deploy(Token).then(function () {
        return deployer.deploy(Exchange, Token.address)
    })

    // deployer.deploy(Factory, Token.address).then(function () {
    // deployer.deploy(Exchange, Token.deployed().address)
    //     })
    // })

};