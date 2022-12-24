# ethernaut

My solutions to [Ethernaut CTF](https://ethernaut.openzeppelin.com/).

## Development

```bash
npm i
```

You need to configure environment variables:

```bash
cp .env.template .env
# fill out
```

Pick a mnemonic and the resulting accounts will be used in the challenges.

#### Hardhat

This repo uses [hardhat](https://hardhat.org/) to run the CTF challenges.
Challenges are implemented as hardhat tests in [`/test`](./test).

The tests run on a local hardnet network but it needs to be forked from goerli because it interacts with the challenge factory and submission contract.
To fork the goerli testnet, you need an archive URL like the free ones from [Alchemy].

#### Running challenges

Optionally set the block number in the `hardhat.config.ts` hardhat network configuration to the goerli head block number such that the challenge contract is deployed.

```bash
# fork goerli but run locally
npx hardhat test test/0-hello.ts
```
