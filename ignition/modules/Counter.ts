import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const CounterModule = buildModule("CounterModule", (m) => {
  const counter = m.contract("Counter"); // name matches your Solidity contract name
  return { counter }; 
});

export default CounterModule; // export the module for use in deployment scripts
