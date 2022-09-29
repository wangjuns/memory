import { Component } from 'react';

import { Container, Fab, IconButton } from '@mui/material';
import { ethers } from "ethers";
import MemoryABI from "../abi/Memory.json";
import AppContext from './AppContext';
import ContractDetail from './ContractDetail';
import Friends from './Friends';
import MintFriend from './MintFriend';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Grid from '@mui/material/Grid';


interface MetamaskProps {

}

interface MetamaskState {
    context?: AppContext;
    content: string;
}

class Metamask extends Component<MetamaskProps, MetamaskState> {
    constructor(props: any) {
        super(props);

        this.state = {
            content: "show",
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

                    <p>Welcome {this.state.context.selectedAddress}</p>
                </>
            );
        }
    }


    renderMain() {
        if (this.state.context) {
            return (
                <>
                    {this.state.content === "show" &&
                        <>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <ContractDetail
                                        context={this.state.context!}
                                        onAddClick={() => this.setState({ ...this.state, content: "new" })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Friends
                                        context={this.state.context!}
                                    />

                                </Grid>

                            </Grid>

                        </>
                    }

                    {this.state.content === "new" &&
                        <MintFriend context={this.state.context!} onSuccess={() => this.setState({ ...this.state, content: "show" })} />
                    }
                </>

            )
        } else {
            return (<></>)
        }
    }



    render() {
        return (
            <div>
                <Container>
                    <>

                        {this.renderMetamask()}

                        {this.renderMain()}

                    </>
                </Container>
            </div>
        )
    }
}

export default Metamask;