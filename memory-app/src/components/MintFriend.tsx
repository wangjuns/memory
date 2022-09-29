import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import AppContext from "./AppContext";
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface MintFriendProps {
    context: AppContext;
    onSuccess?: () => void;
}

function MintFriend({ context, onSuccess }: MintFriendProps) {
    let bless: string;
    const contract = context.contract!;
    const signer = context.provider!.getSigner()

    const contractWithSigner = contract.connect(signer);

    async function submitNew() {
        const id = contractWithSigner["mint(string)"](bless)
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
                        <Button variant="outlined" onClick={() => submitNew()}>祝福</Button>
                    </Grid>



                </Grid>
            </form>
        </>
    )

}

export default MintFriend;