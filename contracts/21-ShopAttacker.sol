pragma solidity ^0.7.3;

abstract contract IShop {
    uint public price;
    bool public isSold;

    function buy() external virtual;
}

contract ShopAttacker {}
