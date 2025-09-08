# Primer Hardhat projekta

## Usage

### Deploy smart contract
Primer deploya smart contracta. Hardhat najprej skompila in nato izvede transakcijo.
```shell
npx hardhat ignition deploy ignition/modules/Token.ts --network coston_flare
```
Če ne uprabimo zastavice --newtork se deploy zgodi lokalno.

### Build
Da preveriš ali si ti program skompila ga lahko prej buildas
```shell
npx hardhat build
```

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

