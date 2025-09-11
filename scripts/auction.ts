import { ethers } from "ethers";

import fs from "fs";
const contractJson = JSON.parse(fs.readFileSync("artifacts/contracts/Auction.sol/Auction.json", "utf8"));

const abi = contractJson.abi;

const data = {
  url: process.env.COSTON_FLARE_RPC_URL,
  privateKeys: [process.env.PRIVATE_KEY],
  contractAddress: "0xD42Cce0EBB870A0034cb02F9787B31FB3ae57c93", // Replace with your deployed Auction contract address
};

const provider = new ethers.JsonRpcProvider(data.url);
let signer = new ethers.Wallet(data.privateKeys[0]!, provider);
const contract = new ethers.Contract(data.contractAddress, abi, signer);

try {
  console.log("Placing bid transaction...");
  const tx = await contract.bid({
    value: "3000000000000000000", // 1 ETH bid
  });
  // const tx = await contract.withdraw();
  console.log("Waiting for transaction to be mined...");
  await tx.wait();
  console.log("Bid placed, transaction hash:", tx.hash);
} catch (error: any) {
  console.error("Error placing bid:", error.message);
}
