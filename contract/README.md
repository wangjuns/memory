# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

# Config .env

```
DEV_API_URL = "https://polygon-mumbai.g.alchemy.com/v2/T9LguG4p10WIWcNojO5KcXg5Dkx59GF6"
DEV_PRIVATE_KEY = "***"


API_URL = "https://polygon-mainnet.g.alchemy.com/v2/cWqKKYnQ6kwnKHNtEcF9tx_Sgaem93Jc"
PRIVATE_KEY = "***"
```

# 部署合约
`npx hardhat run --network devnet  scripts/deploy.ts`