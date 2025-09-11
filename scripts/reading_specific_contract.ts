import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

import fs from "fs";
const contractJson = JSON.parse(fs.readFileSync("artifacts/contracts/Token.sol/Token.json", "utf8"));


const data = {
  url: process.env.COSTON_FLARE_RPC_URL,
  privateKeys: [process.env.PRIVATE_KEY],
  publicKeys: [
    "0xf314Da484E99504d8D80f1385B9a096d789d0711",
    "0x06A5D4546D63148F31f88749d309D9A600Ef8860",
  ],
  contracts: ["0x9cDc545F8Bcda85e0AfBf2DED72269fc88B078bC"],
};

let abi = contractJson.abi;

const initialBufferSize = 100;
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

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
      if (!parsed || parsed.name !== "Transfer") continue; // we are interested only in Transfer events
      if (!data.contracts.includes(log.address)) continue; // we are interested only in specific contracts (defined in data.contracts)

      console.log(
        "Found transfer on contract ",
        log.address,
        " from ",
        parsed.args.from,
        " to ",
        parsed.args.to,
        " amount ",
        parsed.args.amount.toString()
      );
    }
  } catch (e) {
    i--;
    // console.log(e)
    await delay(1000);
  }
}
