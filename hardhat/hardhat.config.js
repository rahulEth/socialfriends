require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require('dotenv').config()

// https://base-mainnet.g.alchemy.com/v2/9Gt8lpwu_WelXSIE83OLYtiB0Smb3CWS
// sapolia
const META_MASK_PRIVATE_KEY= process.env.META_MASK_PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers:[
      {
        version: "0.8.28"
      }
    ]
  },
  networks:{
    sepolia:{
      // url: `https://base-sepolia.infura.io/v3/${INFURA_API_KEY}`,
      url : `https://sepolia.infura.io/v3/${process.env.API_KEY}`,
      accounts: [META_MASK_PRIVATE_KEY] ,
    },

  },
  etherscan: {
    apiKey: {
      // Is not required by blockscout. Can be any non-empty string
      'taiko_hekla': "taiko_hekla",
      "sepolia": process.env.ETHERSCAN
    },
    customChains: [
      {
        network: "taiko_hekla",
        chainId: 167009,
        urls: {
          // apiURL: "https://blockscoutapi.hekla.taiko.xyz/api",
          // browserURL: "https://blockscoutapi.hekla.taiko.xyz",

          apiURL: "https://api.routescan.io/v2/network/testnet/evm/167009/etherscan",
          browserURL: "https://hekla.taikoexplorer.com"
        }
      }
    ]
  },
};

/**
npx hardhat verify --network taikoHelkaTestnet 0xEBadA0d58B5f42a749643fCF1230465F6da53C1E
 */
