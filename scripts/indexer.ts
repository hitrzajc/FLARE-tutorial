import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();


const data = {
    url: process.env.COSTON_FLARE_RPC_URL,
    abi : ["event Transfer(address indexed from, address indexed to, uint amount)"]
}

const initialBufferSize = 100; 

const delay = (ms: number) => new Promise(res => setTimeout(res, ms)); // helper function to wait


let provider = new ethers.JsonRpcProvider(data.url); // creates read-only connection to the blockchain 
const iface = new ethers.Interface(data.abi); // interface object to encode/decode transsactions, parse logs


let blockNumber = await provider.getBlockNumber();
console.log("Current block number: ", blockNumber);

//reads blocks and prints token ERC20 Transfer events
for (let i = blockNumber - initialBufferSize; true; i++) {
    try {
        let block = await provider.getBlock(i); // sanity check - make sure the block exists
        console.log("Processing block: ", i);
        let logs = await provider.getLogs({
            fromBlock: i,
            toBlock: i,
        });

        for (let log of logs) {
            const parsed = iface.parseLog(log);
            if (parsed == null) continue;
            // const amount = ethers.formatUnits(parsed.args.amount, 18); // safely handle BigInt
            console.log(
              `> Transfer detected: from ${parsed.args.from} to ${parsed.args.to}; amount ${parsed.args.amount} on contract ${log.address}.`
            );
        }
    } catch (e) {
        i--;
        await delay(2000);
    }

}