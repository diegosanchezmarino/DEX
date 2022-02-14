pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    // modify token name
    // string public constant NAME = "Ramona";
    // modify token symbol
    // string public constant SYMBOL = ;
    // modify token decimals
    // uint8 public constant DECIMALS = 18;

    // modify initial token supply
    // uint256 public constant INITIAL_SUPPLY = 1000000000000000000;

    constructor(string memory _name, string memory _symbol)
        ERC20(_name, _symbol)
    {}

    function getTokens(uint256 _amount) public {
        _mint(msg.sender, _amount);
    }
}
