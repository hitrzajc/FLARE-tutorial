import type { HardhatUserConfig } from "hardhat/config";

import hardhatToolboxViemPlugin from "@nomicfoundation/hardhat-toolbox-viem";
import { configVariable } from "hardhat/config";
import { ethers } from "ethers";
import { log } from "console";


const data = {
    url: "https://coston-api.flare.network/ext/bc/C/rpc",
    privateKeys: [
        "1c22f22ed219c217f870bea7b8b1e6316cf3c4dd74e5c27c3614f5f4ed19e7db"
    ],

    publicKeys: ["0xf314Da484E99504d8D80f1385B9a096d789d0711",
        "0x06A5D4546D63148F31f88749d309D9A600Ef8860"]
}
console.log(data.url);

let provider = new ethers.JsonRpcProvider(data.url);
console.log("private_key: ", data.privateKeys[0])
while (true) {
    let blockNumber = await provider.getBlockNumber();
    process.stdout.write(`Current block number: ${blockNumber}\r`);
}

// const contractAddress = "0x9cDc545F8Bcda85e0AfBf2DED72269fc88B078bC";
// let signer = new ethers.Wallet(data.privateKeys[0], provider);

// const erc20Abi = [
//     "function balanceOf(address owner) view returns (uint256)",
//     "function transfer(address to, uint256 amount) returns (bool)",
//     "function allowance(address owner, address spender) view returns (uint256)",
//     "function approve(address spender, uint256 amount) returns (bool)",
//     "function totalSupply() view returns (uint256)",
//     "function name() view returns (string)",
//     "function symbol() view returns (string)",
//     "function decimals() view returns (uint8)"
//   ];

// import { Contract } from "ethers";
// let contract = new Contract(contractAddress, erc20Abi, signer)
// // let sym = await contract.symbol()

// let amount = ethers.parseUnits("1.0", 18);
// let tx = await contract.transfer(data.publicKeys[1], amount)
// console.log("waiting for tx to be mined...");
// await tx.wait();
// console.log("Transaction mined: ", tx);