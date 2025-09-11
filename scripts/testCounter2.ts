import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

import fs from "fs";
const contractJson = JSON.parse(
  fs.readFileSync("artifacts/contracts/Counter.sol/Counter.json", "utf8")
);

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


const data = {
  url: process.env.COSTON_FLARE_RPC_URL,
  privateKeys: [process.env.PRIVATE_KEY],
  contractAddress: "0xEaAE7339cf6F99FF587710561ECBBFf1fB0bD21f"
};


let provider = new ethers.JsonRpcProvider(data.url);
let signer = new ethers.Wallet(data.privateKeys[0]!, provider);

const abi = contractJson.abi;
let contract = new ethers.Contract(data.contractAddress, abi, signer);


let initial_count = await contract.count();
console.log("Initial count = ", initial_count);

await contract.incrementBy(9);
await sleep(2000); // wait for 2 seconds to ensure the transaction is mined
console.log("incrementBy(9) done, now trying to read counter value...");

let after_count = await contract.count();
console.log("Count after first increment = ", after_count);

// trying to increment by negative value - should fail
console.log("Now trying to increment by -7 (should fail) ...");
await contract.incrementBy(-7);
await sleep(2000); // wait for 2 seconds to ensure the transaction is mined

console.log("incrementBy(-7) done, now trying to read counter value...");
let count2 = await contract.count();
console.log("End count = ", count2);

