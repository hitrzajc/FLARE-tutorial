import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

const data = {
    url: process.env.COSTON_FLARE_RPC_URL,
    privateKey: process.env.PRIVATE_KEY,
    address: "0xcAB3D461cbC9d0e3E96F9B733e20BADC01997c2A", // replace with your account address
    test_address: "0xD9CFcC3241e3989372016b55De9102478818908F"
}   

let provider = new ethers.JsonRpcProvider(data.url); // creates read-only connection to the blockchain 
const wallet = new ethers.Wallet(data.privateKey!, provider); // creates a (signer's) wallet instance connected to the provider 


async function printBalance(address: string) {
    const balance = await provider.getBalance(address);
    console.log(`Balance: ${ethers.formatEther(balance)} CFLR`);
}

async function sendTransaction(to: string, amount: string) {
    const tx = await wallet.sendTransaction({
        to: to,
        value: ethers.parseEther(amount) // amount in CFLR
    });
    console.log("Transaction hash:", tx.hash);
    await tx.wait(); // wait for the transaction to be mined
    console.log("Transaction confirmed");
}


async function main() {
    console.log("Using test account:", data.test_address, ".");

    const beforeBalance = await provider.getBalance(data.test_address);
    console.log("> Test account balance before:", ethers.formatEther(beforeBalance), "CFLR");

    // transfer 1 CFLR from your account to the test account
    await sendTransaction(data.test_address, "1"); 

    // print the balance of the test acount after the transfer
    const afterBalance = await provider.getBalance(data.test_address);
    console.log("> Test account balance after:", ethers.formatEther(afterBalance), "CFLR");
}

main();