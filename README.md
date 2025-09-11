# [Hardhat](https://hardhat.org/) project examples

> **_NOTE:_**  **You are advised to follow the tutorial in [Tutorial dokument] and try to implement/figure out things by yourself** (using provided documentation, Google and ChatGPT :)). 
However, a bit more detailed guide to creating and deploying some smart contracts is provided here in case of any trouble. 


##  Environment


[Instructions](https://hardhat.org/docs/getting-started#getting-started-with-hardhat-3):

First, create a folder for your project and run:
```shell 
npx hardhat --init
```
Select _A TypeScript Hardhat project using Node Test Runner and Viem_, agree to convert your project to ESM, agree to install necessary dependencies.

Modify existing `hardhat.config.ts` so that `evmVersion = "london"` (already done in [`hardhat.config.ts`](FLARE-tutorial/hardhat.config.ts)).


Variables `COSTON_FLARE_RPC_URL` and `ACC_PRIVATE_KEY` need to be set. 
You can use [Hardhat keystore for managing secrets](https://hardhat.org/docs/learn-more/deploying-contracts#managing-secrets).

> You can use `.env` file to store the credentials, but _do not forget_ to add `.env` to your `.gitignore` file!

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

To deploy, replace `MODUL_NAME.ts` with actual modul name and run:
```shell 
npx hardhat ignition deploy ./ignition/modules/MODULE_NAME.ts --network coston_flare
```
If you omit the `--network` flag, the deployment will run locally. 


Running this will:
- compile contract;
- deploy chosen module with constructor arguments that are written in it (you can change them);
- store metadata in [`ignition/deployments`](ignition/deployments). 
If you rerun it, it won’t redeploy unless something changes.



### Creating and deploying an ERC-20 token and interacting with it
By deploying the [`Token.ts`](ignition/modules/Token.ts) script, you will deploy your ERC-20 token. The Solidity code is written in [`Token.sol`](contracts/Token.sol) file. 

Now, you can send this tokens to any account. You can test that in [`testToken.ts`](scripts/testToken.ts).


### Creating and running scripts 
All your scripts can be put in the [`scripts`](scripts) folder. You run a script `example_script.ts` with:
```shell
npx hardhat run scripts/example_script.ts
```

### Indexer (desctiption also in tutorial document)
A blockchain indexer is a specialized tool that extracts transaction data from blockchain nodes, transforms it into a machine and human-readable form (and loads it into a database for easy querying).

The script [`indexer.ts`](/scripts/indexer.ts) continuously monitors past and new blocks on Coston and prints every ERC-20 token transfer it finds.


#### ERC-20 token transfers
If you make an ERC-20 transfer, internal balances in the token's contract storage are updated and this information does not appear as a native blockchain transaction between two addresses. The transaction in the blockchain is just a request to a contract. 
To get the data about ERC-20 transfers, we need to read logs.
When a smart contract executes, it can emit events/logs. They tell you what happened inside a transaction that isn’t obvious just from state changes. 


The ERC-20 standard says every token contract must emit a `Transfer` event. This is a parsed event fragment that belongs to a `Transfer` event:
```shell
EventFragment {
 type: 'event',
 inputs: [
   ParamType {
     name: 'from',
     type: 'address',
     baseType: 'address',
     indexed: true,
     components: null,
     arrayLength: null,
     arrayChildren: null
   },
   ParamType {
     name: 'to',
     type: 'address',
     baseType: 'address',
     indexed: true,
     components: null,
     arrayLength: null,
     arrayChildren: null
   },
   ParamType {
     name: 'value',
     type: 'uint256',
     baseType: 'uint256',
     indexed: false,
     components: null,
     arrayLength: null,
     arrayChildren: null
   }
 ],
 name: 'Transfer',
 anonymous: false
}

1

> More detailed desctiption of the script if you need additional explanation.
> - The script connects to the Coston blockchain via an RPC URL (ethers.JsonRpcProvider).
> - It sets up an Interface for parsing ERC20 Transfer events using an ABI that was created when we deployed our ERC-20 token.
> - It fetches the latest block number and starts scanning blocks from blockNumber - 100 (initial buffer).
> - It loops infinitely over blocks, and for each block:
>     - Fetches the block to make sure it exists.
>     - Gets all logs/events from that block.
>     - Parses logs to detect ERC20 Transfer events.
>     - Prints the sender (from), recipient (to), amount, and contract address.
>     - If an error occurs (e.g., block not available), it waits 2 seconds and retries the same block.


### Interacting with an account 
The script [`accountInteraction.ts`](scripts/accountInteraction.ts) provides a simple function to check and print account's balance. The main function checks and prints the test account's balance, transfers 1 CFLR to it and prints its balance after the transaction. 



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

