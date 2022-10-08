import * as dotenv from "dotenv";

console.log(__dirname + '/.env')

dotenv.config({ path: __dirname + '/.env' });


import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const { API_URL, PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    devnet: {
      url: process.env.DEV_API_URL,
      accounts: [`0x${process.env.DEV_PRIVATE_KEY}`]
    },
    onlinenet: {
      url: process.env.API_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }
  }
};

export default config;
