pragma solidity ^0.7.3;

import "@openzeppelin/contracts/math/SafeMath.sol";

interface IGatekeeperTwo {
    function enter(bytes8 _gateKey) external returns (bool);
}

contract GatekeeperTwoAttacker {}
