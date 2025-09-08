import { ethers } from "ethers";

import auctionJson from "../artifacts/contracts/Auction.sol/Auction.json" assert { type: "json" };
const abi = auctionJson.abi;

const data = {
    url: "https://coston-api.flare.network/ext/bc/C/rpc",
    contractAddress: "0xD42Cce0EBB870A0034cb02F9787B31FB3ae57c93", // Replace with your deployed Auction contract address
    privateKeys: [
        "1c22f22ed219c217f870bea7b8b1e6316cf3c4dd74e5c27c3614f5f4ed19e7db"
    ],
    publicKeys: ["0xf314Da484E99504d8D80f1385B9a096d789d0711",
        "0x06A5D4546D63148F31f88749d309D9A600Ef8860"]
}


const provider = new ethers.JsonRpcProvider(data.url);
let signer = new ethers.Wallet(data.privateKeys[0], provider);


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