import { expect } from "chai";
import { BigNumber, Contract, Signer } from "ethers";
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
    const challengeFactory = await ethers.getContractFactory(`Vault`);
    const challengeAddress = await createChallenge(
        `0xf94b476063B6379A3c8b6C836efB8B3e10eDe188`
    );
    challenge = await challengeFactory.attach(challengeAddress);
});

it("solves the challenge", async function () {});

after(async () => {
    expect(await submitLevel(challenge.address), "level not solved").to.be.true;
});
