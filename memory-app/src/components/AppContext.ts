import { ethers } from "ethers";

interface AppContext {
    selectedAddress?: string;
    provider?: ethers.providers.Web3Provider;
    contract?: ethers.Contract;

}

export default AppContext;