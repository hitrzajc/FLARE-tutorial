import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("Token", (m) => {
  const token = m.contract("Token", ["TokenName", "TKN"]);

  return { token };
});
