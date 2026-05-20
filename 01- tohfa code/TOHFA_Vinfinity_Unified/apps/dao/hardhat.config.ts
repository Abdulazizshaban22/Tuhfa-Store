import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    amoy: { url: process.env.POLYGON_RPC_URL||"", accounts: process.env.WEB3_PRIVATE_KEY? [process.env.WEB3_PRIVATE_KEY] : [] }
  }
};
export default config;
