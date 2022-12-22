pragma solidity ^0.7.3;

interface IElevator {
    function goTo(uint256 _floor) external;
}

contract ElevatorAttacker {}
