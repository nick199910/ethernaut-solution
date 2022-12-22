pragma solidity ^0.7.3;
import "hardhat/console.sol";

abstract contract IReentrance {
    mapping(address => uint256) public balances;

    function donate(address _to) external payable virtual;

    function withdraw(uint256 _amount) external virtual;
}

contract ReentranceAttacker {}
