import { ethers } from "ethers";

interface AppContext {
    selectedAddress?: string;
    provider?: ethers.providers.Web3Provider | ethers.providers.AlchemyProvider;
    contract?: ethers.Contract;

}

export default AppContext;