import React, { Component } from 'react';

import { ethers } from "ethers";
import MemoryABI from "../abi/Memory.json"
import { Button, Chip, Container, TextField } from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';
import AppContext from './AppContext';
import Friends from './Friends';
import ContractDetail from './ContractDetail';

interface MetamaskProps {

}

interface MetamaskState {
    context?: AppContext;
    state: string;
}

class Metamask extends Component<MetamaskProps, MetamaskState> {
    constructor(props: any) {
        super(props);

        this.state = {
            state: "list",
        };
    }


    async connectToMetamask() {
        // @ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const accounts = await provider.send("eth_requestAccounts", []);

        const contract = new ethers.Contract('0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9', MemoryABI, provider);

        this.setState({
            context: {
                selectedAddress: accounts[0],
                contract: contract,
                provider: provider,
            }
        });
    }

    renderMetamask() {

        if (!this.state.context) {
            return (
                <>
                    <button onClick={() => this.connectToMetamask()}>Connect to Metamask</button>

                </>
            )
        } else {
            return (
                <>
                    <button onClick={() => { this.setState({ ...this.state, state: "new" }) }}>Add New</button>
                    <p>Welcome {this.state.context.selectedAddress}</p>
                </>
            );
        }
    }



    render() {
        return (
            <div>
                <Container>
                    <>

                        {this.renderMetamask()}

                        {this.state.context &&
                            <ContractDetail
                                context={this.state.context!}
                            />
                        }

                        {this.state.context &&
                            <Friends
                                context={this.state.context!}
                            />
                        }

                    </>
                </Container>
            </div>
        )
    }
}

export default Metamask;