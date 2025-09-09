import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();


function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


const provider = new ethers.JsonRpcProvider(process.env.COSTON_FLARE_RPC_URL);  
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);  
const address = "0x605D385a80C1608AC79337fb2223b0524dd3AE5e";  // replace with your deployed contract address
const abi = [
  "function count() view returns (uint256)",
  "function increment()"
];

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