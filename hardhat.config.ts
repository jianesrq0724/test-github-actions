import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import 'solidity-coverage';
require("@nomiclabs/hardhat-etherscan");

// import "hardhat-gas-reporter"

// require('hardhat-abi-exporter');

export default {
  default: 'hardhat',
  networks: {
    hardhat: {
      throwOnTransactionFailures: true,
      throwOnCallFailures: true,
      allowUnlimitedContractSize: true,
      blockGasLimit: 0x1ffffffff,
    },
    sepolia: {
      url: 'https://api.zan.top/node/v1/eth/sepolia/f09bed6e698943808586134b93ab4749'
    },
    eth: {
      url: 'https://api.zan.top/node/v1/eth/mainnet/f09bed6e698943808586134b93ab4749'
    },
    bsc: {
      url: 'https://api.zan.top/node/v1/bsc/mainnet/f09bed6e698943808586134b93ab4749'
    },
    okt: {
      url: 'https://exchainrpc.okex.org'
    },
    polygon: {
      url: "https://polygon-bor.publicnode.com"
    },
    heco: {
      url: "https://http-mainnet.hecochain.com"
    },
    CORE: {
      url: 'https://rpc.coredao.org/'
    },
    optimism: {
      url: 'https://api.zan.top/node/v1/opt/mainnet/f09bed6e698943808586134b93ab4749'
    },
    arbitrum: {
      url: 'https://api.zan.top/node/v1/arb/one/f09bed6e698943808586134b93ab4749'
    },
    base: {
      url: 'https://api.zan.top/node/v1/base/mainnet/f09bed6e698943808586134b93ab4749'
    },
    fantom: {
      url: 'https://api.zan.top/node/v1/ftm/mainnet/f09bed6e698943808586134b93ab4749'
    },
    avax: {
      url: 'https://api.avax.network/ext/bc/C/rpc'
    },
    cronos: {
      url: 'https://cronos-evm-rpc.publicnode.com'
    },
    pulse: {
      url: 'https://pulsechain-testnet-rpc.publicnode.com'
    },
    Mantle: {
      url: 'https://rpc.mantle.xyz'
    },
    hashkeychainTest: {
      url: 'https://hashkeychain-testnet.alt.technology'
    }
  },
  etherscan: {
    apiKey: "AUQI5FHSU4GEV5P6DJFCM4C4VEIY4FVRAY"
  },
  solidity: {
    version: '0.8.16',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
    },
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './build/cache',
    artifacts: './build/artifacts/contracts',
  }
};
