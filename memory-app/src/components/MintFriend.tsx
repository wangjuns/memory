import { Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material";
import AppContext from "./AppContext";
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { storage } from "./firebase"
import { v4 as uuidv4 } from 'uuid';


interface MintFriendProps {
    context: AppContext;
    onSuccess?: () => void;
}

function MintFriend({ context, onSuccess }: MintFriendProps) {
    let bless: string;
    const contract = context.contract!;
    const [file, setFile] = useState();

    function handleChange(event: any) {
        setFile(event.target.files[0]);
    }

    //const accounts = await provider.send("eth_requestAccounts", []);
    const signer = context.provider!.getSigner()

    const contractWithSigner = contract.connect(signer);

    function stringToBuffer(s: string) {

        return new TextEncoder().encode(s);
    }

    async function submitNew() {
        if (!file) {
            alert("Please choose a file first!")
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
                            <TextField id="bless" fullWidth label="say..." variant="standard" onChange={(e) => bless = e.target.value} />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>

                        <input type="file" accept="image/*" onChange={handleChange} />
                    </Grid>


                    <Grid item xs={12}>
                        <Button variant="outlined" onClick={() => submitNew()}>祝福</Button>
                    </Grid>



                </Grid>
            </form>
        </>
    )

}

export default MintFriend;