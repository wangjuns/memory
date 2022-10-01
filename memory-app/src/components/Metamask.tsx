import { useState } from 'react';

import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import { ethers } from "ethers";
import MemoryABI from "../abi/Memory.json";
import AppContext from './AppContext';
import ContractDetail from './ContractDetail';
import Friends from './Friends';
import MintFriend from './MintFriend';


function Metamask() {
    const { REACT_APP_NETWORK, REACT_APP_API_KEY, REACT_APP_CONTRACT_ID } = process.env;

    const [context, setContext] = useState<AppContext>();
    const [content, setContent] = useState<string>("show");


    async function connectToMetamask() {

        let provider;

        if (process.env.NODE_ENV !== 'production') {
            // @ts-ignore
            provider = new ethers.providers.Web3Provider(window.ethereum);
        } else {
            provider = new ethers.providers.AlchemyProvider(REACT_APP_NETWORK, REACT_APP_API_KEY);
        }

        const contract = new ethers.Contract(REACT_APP_CONTRACT_ID!, MemoryABI, provider);

        setContext({
            //selectedAddress: accounts[0],
            contract: contract,
            provider: provider,
        });
    }

    function renderMetamask() {
        if (!context) {
            connectToMetamask()
        }
    }


    function renderMain() {
        if (context) {
            return (
                <>
                    {content === "show" &&
                        <>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <ContractDetail
                                        context={context!}
                                        onAddClick={() => setContent("new")}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Friends
                                        context={context!}
                                    />

                                </Grid>

                            </Grid>

                        </>
                    }

                    {content === "new" &&
                        <MintFriend context={context!} onSuccess={() => setContent("show")} />
                    }
                </>

            )
        } else {
            return (<></>)
        }
    }

    renderMetamask()


    return (
        <div>
            <Container>
                {renderMain()}
            </Container>
        </div>
    )

}

export default Metamask;