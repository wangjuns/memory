import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import { ethers } from "ethers";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import AppContext from "./AppContext";
import { storage } from "./firebase";
import { NFTStorage, File } from 'nft.storage'


interface MintFriendProps {
    context: AppContext;
    onSuccess?: () => void;
}


function MintFriend({ context, onSuccess }: MintFriendProps) {
    const [bless, setBless] = useState<string>();
    const contract = context.contract!;
    const [file, setFile] = useState<File>();

    function handleChange(event: any) {
        console.log(event)
        setFile(event.target.files[0]);
    }

    //@ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const login = async () => await provider.send("eth_requestAccounts", []);
    login()

    const signer = provider!.getSigner()

    const contractWithSigner = contract.connect(signer);

    function stringToBuffer(s: string) {

        return new TextEncoder().encode(s);
    }

    async function submitFirebase() {
        if (!file) {
            alert("Please choose a file first!")
            return;
        }

        const filename = `/haihesfriends/data/${uuidv4()}`
        const metaname = `/haihesfriends/meta/${uuidv4()}.json`

        const storageRef = ref(storage, filename)
        //@ts-ignore
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.then(
            (snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    console.log(url);

                    const meta = {
                        name: "demo",
                        description: bless,
                        image: url,
                    }
                    const metaRef = ref(storage, metaname)
                    const metaUploadTask = uploadBytesResumable(metaRef, stringToBuffer(JSON.stringify(meta)));

                    metaUploadTask.then(
                        (snapshot) => {
                            getDownloadURL(snapshot.ref).then(async (metaUrl) => {
                                let id = await contractWithSigner["mint(string)"](metaUrl)
                                console.log(`add success ${id}`)
                                if (onSuccess) {
                                    onSuccess()
                                }
                            })
                        }
                        ,
                        (error) => {
                            console.log(error)
                        }
                    )
                });
            },
            (error) => {
                console.log(error)
            })


    }

    async function submitIpfs() {
        if (!file) {
            alert("Please choose a file first!")
            return;
        }

        const name = uuidv4()

        const nftstorage = new NFTStorage({ token: process.env.REACT_APP_NFT_STORAGE_TOKEN! })

        //file.name = name;
        const metadata = await nftstorage.store({
            image: file,
            name: name,
            description: "",
        })

        console.log(metadata)

        let id = await contractWithSigner["mint(string)"](metadata.url)
        console.log(`add success ${id}`)
        if (onSuccess) {
            onSuccess()
        }
    }

    return (
        <>
            <IconButton onClick={() => onSuccess?.()}>
                <ArrowBackIcon />
            </IconButton>

            <Typography variant="h3" gutterBottom>
                Blessing
            </Typography>
            <form>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={4}
                >

                    <Grid item xs={8}>
                        <Box
                            sx={{
                                width: 500,
                                maxWidth: '100%',
                            }}
                        >
                            <TextField id="bless" fullWidth label="say..." variant="standard" onChange={(e) => setBless(e.target.value)} />
                        </Box>
                    </Grid>

                    <Grid item xs={12}>

                        <input type="file" accept="image/*" onChange={handleChange} />
                    </Grid>


                    <Grid item xs={12}>
                        <Button variant="outlined" onClick={() => submitIpfs()}>祝福</Button>
                    </Grid>



                </Grid>
            </form>
        </>
    )

}

export default MintFriend;