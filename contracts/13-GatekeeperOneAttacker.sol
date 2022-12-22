pragma solidity ^0.7.3;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "hardhat/console.sol";

interface IGatekeeperOne {
    function enter(bytes8 _gateKey) external returns (bool);
}

contract GatekeeperOneAttacker {}
