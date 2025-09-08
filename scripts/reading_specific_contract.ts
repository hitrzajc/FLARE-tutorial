import type { HardhatUserConfig } from "hardhat/config";

import hardhatToolboxViemPlugin from "@nomicfoundation/hardhat-toolbox-viem";
import { configVariable } from "hardhat/config";
import { ethers } from "ethers";
import { log } from "console";
import { skaleEuropa } from "viem/chains";
import { compactSignatureToHex } from "viem";


const data = {
    url: "https://coston-api.flare.network/ext/bc/C/rpc",
    privateKeys: [
        "1c22f22ed219c217f870bea7b8b1e6316cf3c4dd74e5c27c3614f5f4ed19e7db"
    ],

    publicKeys: ["0xf314Da484E99504d8D80f1385B9a096d789d0711",
        "0x06A5D4546D63148F31f88749d309D9A600Ef8860"],

    contracts: ["0x9cDc545F8Bcda85e0AfBf2DED72269fc88B078bC",

    ]
}
let abi = [
  "event Transfer(address indexed from, address indexed to, uint amount)"
]
const initialBufferSize = 100;
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
let provider = new ethers.JsonRpcProvider(data.url);

const iface = new ethers.Interface(abi);

let blockNumber = await provider.getBlockNumber();

//reads blocks and prints token ERC20 Transfer events for specific contracts
for (let i = blockNumber - initialBufferSize; true; i++) {
    try {
        let block = await provider.getBlock(i);
        process.stdout.write(`Processing block: \x1b[33m${i}\x1b[0m\r`);
        let logs = await provider.getLogs({
            fromBlock: i,
            toBlock: i,
        });

        for (let log of logs) {
            const parsed = iface.parseLog(log);
            if (parsed == null) continue;
            if (!data.contracts.includes(log.address)) continue;
         
            console.log("Found transfer on contract ", log.address, 
                " from ", parsed.args.from, " to ", parsed.args.to, 
                " amount ", parsed.args.amount.toString());
        }
    } catch (e) {
        i--;
        // console.log(e)
        await delay(1000);
    }

}
