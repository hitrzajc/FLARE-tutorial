import type { HardhatUserConfig } from "hardhat/config";

import hardhatToolboxViemPlugin from "@nomicfoundation/hardhat-toolbox-viem";
import { configVariable } from "hardhat/config";
import { ethers } from "ethers";
import { log } from "console";


const data = {
    // url: configVariable("COSTON_FLARE_RPC_URL"),
    url: "https://coston-api.flare.network/ext/bc/C/rpc",
    privateKeys: [
        "1c22f22ed219c217f870bea7b8b1e6316cf3c4dd74e5c27c3614f5f4ed19e7db", 
        ],
    publicKeys: ["0xf314Da484E99504d8D80f1385B9a096d789d0711",
        "0x06A5D4546D63148F31f88749d309D9A600Ef8860"]
}
console.log(data.url);

let provider = new ethers.JsonRpcProvider(data.url);
console.log("private_key: ", data.privateKeys[0])
let signer = new ethers.Wallet(data.privateKeys[0], provider);
// while (true) {
//     let blockNumber = await provider.getBlockNumber();
//     process.stdout.write(`Current block number: ${blockNumber}\r`);
// }

const contractAddress = "0xa366d2Ce46f0a352D795C6DD815435Ca62406454";

const Abi = [
    "function inc() returns ()",
    "function incBy(uint256 value) returns ()",
    "function x() view returns (uint256)"
];


import { Contract } from "ethers";
let contract = new Contract(contractAddress, Abi, signer)
let _ = await contract.incBy(9n)
await _.wait();
console.log("incBy(-15) done, now trying to read x");

let contract1 = new Contract(contractAddress, Abi, signer)
let x = await contract1.x()
console.log("x = ", x);




// let amount = ethers.parseUnits("1.0", 18);
// let tx = await contract.transfer(data.publicKeys[1], amount)
// console.log("waiting for tx to be mined...");
// await tx.wait();
// console.log("Transaction mined: ", tx);