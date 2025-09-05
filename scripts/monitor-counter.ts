import { ethers } from "ethers";

const data = {
    url: "https://coston-api.flare.network/ext/bc/C/rpc",
    contractAddress: "YOUR_DEPLOYED_CONTRACT_ADDRESS", // Replace with your deployed Counter contract address
    privateKeys: [
        "1c22f22ed219c217f870bea7b8b1e6316cf3c4dd74e5c27c3614f5f4ed19e7db"
    ],
    publicKeys: ["0xf314Da484E99504d8D80f1385B9a096d789d0711",
        "0x06A5D4546D63148F31f88749d309D9A600Ef8860"]
}

const counterABI = [
    "event Increment(uint by)",
    "function x() view returns (uint)",
    "function inc()",
    "function incBy(uint by)"
];

const provider = new ethers.JsonRpcProvider(data.url);
const contract = new ethers.Contract(data.contractAddress, counterABI, provider);

async function monitorEvents() {
    try {
        // Get current value of x
        const currentX = await contract.x();
        console.log("Current value of x:", currentX.toString());

        // Get current block number
        const currentBlock = await provider.getBlockNumber();
        console.log("Current block:", currentBlock);

        // Look for past events (last 1000 blocks)
        const pastEvents = await contract.queryFilter(
            contract.filters.Increment(),
            currentBlock - 1000,
            currentBlock
        );
        
        console.log("Past Increment events:");
        pastEvents.forEach(event => {
            console.log(`Block ${event.blockNumber}: Incremented by ${event.args?.[0]}`);
        });

        // Listen for new events
        console.log("\nListening for new Increment events...");
        contract.on("Increment", (by, event) => {
            console.log(`New increment by ${by} at block ${event.blockNumber}`);
        });

    } catch (e: any) {
        console.error("Error:", e?.message || e);
    }
}

monitorEvents();
