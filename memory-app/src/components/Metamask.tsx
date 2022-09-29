import React, { Component } from 'react';

import { ethers } from "ethers";
import MemoryABI from "../abi/Memory.json"
import { Button, Chip, Container, TextField } from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';
import AppContext from './AppContext';
import Friends from './Friends';
import ContractDetail from './ContractDetail';
import MintFriend from './MintFriend';

interface MetamaskProps {

}

interface MetamaskState {
    context?: AppContext;
    state: string;
    showAdd: boolean;
}

class Metamask extends Component<MetamaskProps, MetamaskState> {
    constructor(props: any) {
        super(props);

        this.state = {
            state: "list",
            showAdd: false,
        };
    }


    async connectToMetamask() {
        // @ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const accounts = await provider.send("eth_requestAccounts", []);

        const contract = new ethers.Contract('0x2279b7a0a67db372996a5fab50d91eaa73d2ebe6', MemoryABI, provider);

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
                    <button onClick={() => { this.setState({ ...this.state, showAdd: true }) }}>Add New</button>
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

                        {this.state.showAdd &&
                            <MintFriend context={this.state.context!} />
                        }

                    </>
                </Container>
            </div>
        )
    }
}

export default Metamask;