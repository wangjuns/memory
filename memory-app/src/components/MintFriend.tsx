import { Button, IconButton, Stack, TextField } from "@mui/material";
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
        <form>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <IconButton onClick={() => onSuccess?.()}>
                        <ArrowBackIcon />
                    </IconButton>

                </Grid>
                <Grid item xs={8}>
                    <TextField id="bless" label="say..." variant="standard" onChange={(e) => bless = e.target.value} />
                </Grid>

                <Grid item xs={12}>
                    <Button variant="outlined" onClick={() => submitNew()}>祝福</Button>
                </Grid>



            </Grid>
        </form>
    )

}

export default MintFriend;