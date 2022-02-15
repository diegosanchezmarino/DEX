//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./Exchange.sol";

contract Factory {
    mapping(address => address) public tokenToExchange;

    event ExchangeCreated(address tokenAddress, address exchangeAddress);

    function createExchange(address _tokenAddress) public returns (address) {
        require(_tokenAddress != address(0), "invalid token address");
        require(
            tokenToExchange[_tokenAddress] == address(0),
            "exchange already exists"
        );

        ERC20 token = ERC20(_tokenAddress);
        string memory exchangeName = string(
            abi.encodePacked(token.name(), " Exchange")
        );
        string memory exchangeSmybol = string(
            abi.encodePacked(token.symbol(), " LP")
        );
        Exchange exchange = new Exchange(
            _tokenAddress,
            exchangeName,
            exchangeSmybol
        );
        tokenToExchange[_tokenAddress] = address(exchange);

        emit ExchangeCreated(_tokenAddress, address(exchange));

        return address(exchange);
    }

    function getExchange(address _tokenAddress) public view returns (address) {
        return tokenToExchange[_tokenAddress];
    }
}
