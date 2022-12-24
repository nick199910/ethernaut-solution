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
    const challengeFactory = await ethers.getContractFactory(`CoinFlip`);
    const challengeAddress = await createChallenge(
        `0x9240670dbd6476e6a32055E52A0b0756abd26fd2`
    );
    challenge = await challengeFactory.attach(challengeAddress);

    const attackerFactory = await ethers.getContractFactory(`CoinFlipAttacker`);
    attacker = await attackerFactory.deploy(challenge.address);
});

it("solves the challenge", async function () {
    console.log(attacker.address);
    for (let i = 0; i < 10; i++) {
        const tx = await attacker.attack({
            gasPrice: ethers.utils.parseUnits("3", "gwei"),
            gasLimit: 2100000,
        });
        await tx.wait();
    }
});

after(async () => {
    expect(await submitLevel(challenge.address), "level not solved").to.be.true;
});
