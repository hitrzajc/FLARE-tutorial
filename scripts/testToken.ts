import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

const data = {
    url: process.env.COSTON_FLARE_RPC_URL,
    privateKey: process.env.PRIVATE_KEY,
    tokenAddress: "0x7A2a737936F5b173BB158b670c2d88787A45Dc3f", // change to the address of YOUR deployed token from Token.ts script
    recipient: "0xD9CFcC3241e3989372016b55De9102478818908F", // you can change recipient address here
};

async function main() {
    // Connect to the Coston network
    const provider = new ethers.JsonRpcProvider(data.url);
    const wallet = new ethers.Wallet(data.privateKey!, provider);
    console.log(`Using address ${wallet.address}`);

    // Connect to the deployed token contract
    const tokenAbi = [
        "function balanceOf(address owner) view returns (uint256)",
        "function transfer(address to, uint amount) returns (bool)",
        "event Transfer(address indexed from, address indexed to, uint amount)",
    ];
    const tokenContract = new ethers.Contract(data.tokenAddress, tokenAbi, wallet);

    // Check the initial balance of the recipient
    let balance = await tokenContract.balanceOf(data.recipient);
    console.log(`Initial balance of recipient: ${ethers.formatUnits(balance, 18)} TOKENS`);
    
    // Transfer 10 tokens to the recipient
    const amount = ethers.parseUnits("10.0", 18); // 10 tokens with 18 decimals
    const tx = await tokenContract.transfer(data.recipient, amount);
    console.log(`Transaction hash: ${tx.hash}`);
    await tx.wait();
    console.log("Transfer confirmed");

    // Check the final balance of the recipient
    balance = await tokenContract.balanceOf(data.recipient);
    console.log(`Final balance of recipient: ${ethers.formatUnits(balance, 18)} TOKENS`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});