pragma solidity ^0.7.3;

interface ITelephone {
    function changeOwner(address _owner) external;
}

contract TelephoneAttacker {}
