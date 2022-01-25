




const Token = artifacts.require("Token");
// const Factory = artifacts.require("Factory");
// const Exchange = artifacts.require("Exchange");

module.exports = function (deployer) {

    deployer.deploy(Token)

    // deployer.deploy(Token("Ramona token", "MONA", 10000000000000000000000)).then(function () {
    // deployer.deploy(Factory.Token.address).then(function () {
    // deployer.deploy(Exchange, Token.deployed().address)
    //     })
    // })

};