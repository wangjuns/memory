import { Button, TextField } from "@mui/material";
import AppContext from "./AppContext";

function MintFriend({ context }: { context: AppContext }) {
    let name: string;
    let bless: string;
    let memory: string;
    const contract = context.contract!;
    const signer = context.provider!.getSigner()

    const contractWithSigner = contract.connect(signer);

    async function submitNew() {
        const id = contractWithSigner["mint(string)"](bless)
        console.log(`add success ${id}`)
    }

    return (
        <form>
            {/* <TextField id="name" label="Name" variant="standard" onChange={(e) => name = e.target.value} /> */}
            <TextField id="bless" label="祝福" variant="standard" onChange={(e) => bless = e.target.value} />
            {/* <TextField id="memory" label="回忆" variant="standard" onChange={(e) => memory = e.target.value} /> */}

            <Button variant="outlined" onClick={() => submitNew()}>Submit</Button>


        </form>
    )

}

export default MintFriend;