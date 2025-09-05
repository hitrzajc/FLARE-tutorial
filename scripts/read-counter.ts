import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("https://coston-api.flare.network/ext/bc/C/rpc");

// Counter contract ABI - we only need the function we want to call
const counterABI = [
    "function x() view returns (uint256)"
];

// Replace this with your deployed contract address
const contractAddress = "0xa366d2Ce46f0a352D795C6DD815435Ca62406454";
const counter = new ethers.Contract(contractAddress, counterABI, provider);

async function main() {
    try {
        const value = await counter.x();
        console.log("Current counter value:", value.toString());
    } catch (error) {
        console.error("Error reading counter value:", error);
    }
}

main();
