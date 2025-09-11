import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();


import fs from "fs";
const contractJson = JSON.parse(fs.readFileSync("artifacts/contracts/Counter.sol/Counter.json", "utf8"));

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


const provider = new ethers.JsonRpcProvider(process.env.COSTON_FLARE_RPC_URL);  
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);  
const address = "0xEaAE7339cf6F99FF587710561ECBBFf1fB0bD21f";  // replace with your deployed contract address
const abi = contractJson.abi; // ABI from the compiled contract JSON artifact

const contract = new ethers.Contract(address, abi, wallet);

async function readCount() {
  const current = await contract.count(); // read current count from the contract
  console.log("Before count:", current.toString());
  const tx =  await contract.increment(); // increment the count and get the transaction response
  console.log("Transaction hash:", tx.hash)
  await sleep(2000); // wait for 2 seconds to ensure the transaction is mined
  const updated = await contract.count(); // read updated count from the contract
  console.log("After count:", updated.toString());
}

readCount();