pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    // modify token name
    string public constant NAME = "Ramona";
    // modify token symbol
    string public constant SYMBOL = "MONA";
    // modify token decimals
    uint8 public constant DECIMALS = 18;
    // modify initial token supply
    // uint256 public constant INITIAL_SUPPLY = 10000 * (10**uint256(DECIMALS)); // 10000 tokens
    uint256 public constant INITIAL_SUPPLY = 1000000000000000000;

    constructor() ERC20(NAME, SYMBOL) {}

    function getToken(uint256 _amount) public {
        _mint(msg.sender, _amount);
    }
}
