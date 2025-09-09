# Primer [Hardhat](https://hardhat.org/) projekta


## Creating and deploying a smart contract (ERC-20 token)


[Instructions](https://hardhat.org/docs/getting-started#getting-started-with-hardhat-3):

First, create a folder for your project and run:
```shell 
npx hardhat --init
```
Select _A TypeScript Hardhat project using Node Test Runner and Viem_, agree to convert your project to ESM, agree to install necessary dependencies.

Modify existing `hardhat.config.ts` so that `evmVersion = "london"` (already done in [`hardhat.config.ts`](FLARE-tutorial/hardhat.config.ts)).


Variables `COSTON_FLARE_RPC_URL` and `ACC_PRIVATE_KEY` need to be set. 
You can use [Hardhat keystore for managing secrets](https://hardhat.org/docs/learn-more/deploying-contracts#managing-secrets).

Set:
- `COSTON_FLARE_RPC_URL`=[https://coston-api.flare.network/ext/bc/C/rpc]()
- `ACC_PRIVATE_KEY`=_”YOUR_PRIVATE_KEY”_


#### Build
To check whether your Solidity contracts compile successfully, run:
```shell 
npx hardhat build
```

#### Deployment
Hardhat (version 3) creates an Ignition folder (a deployment framework that replaces the need for a manual `deploy.ts` script). This folder manages:
- Which contracts you want to deploy.
- Constructor parameters.
- Deployment order.
- Idempotency (if you rerun, it won’t redeploy if nothing changed).

To deploy, run:
```shell 
npx hardhat ignition deploy ./ignition/modules/Token.ts --network coston_flare
```
If you omit the `--network` flag, the deployment will run locally. 


Running this will compile contract, deploy [`Token.ts`](ignition/modules/Token.ts) with constructor arguments that are written in it (you can change them); it will store metadata in [`ignition/deployments`](ignition/deployments). If you rerun it, it won’t redeploy unless something changes (you can still write `deploy.ts` script manually if you wish).

#### Problems 
If you clone this code, deploying will probably fail with 

```shell
[ Token ] reconciliation failed ⛔
The module contains changes to executed futures:

Token#Token:
From account has been changed from 0xaddress1 to 0xaddress2

Consider modifying your module to remove the inconsistencies with deployed futures.
```


This happens because Ignition tracks deployments - it keeps a record of what has already been deployed before. When you run `npx hardhat ignition deploy` again, Ignition compares the module definition with the existing deployment state.

The first deployment used the contract owner’s address from the repository. Now you are deploying with a different account, which causes a mismatch. This mismatch is detected and a warning is issued. 

If you want a fresh deployment, you should delete Ignition’s deployment state folder [`ignition/deployments`](ignition/deployments) and redeploy. 







---


### Scripts
Svoje skripte damo v mapo `./scripts/` in jih lahko poženemo
```shell
npx hardhat run scripts/example_script.ts
```

### Running Tests

To run all the tests in the project, execute the following command:

```shell
npx hardhat test
```

You can also selectively run the Solidity or `node:test` tests:

```shell
npx hardhat test solidity
npx hardhat test nodejs
```

