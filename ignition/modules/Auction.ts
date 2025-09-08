import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("Auction", (m) => {
    const biddingTime = "1757326240"
    const beneficiaryAddress = "0xf314Da484E99504d8D80f1385B9a096d789d0711"
    const auction = m.contract("Auction",[biddingTime, beneficiaryAddress]);

    return { auction };
});
