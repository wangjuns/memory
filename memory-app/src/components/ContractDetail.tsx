import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import AppContext from "./AppContext";

function ContractDetail({ context }: { context: AppContext }) {

    const contract = context.contract!;

    const [name, setName] = useState<string>()
    const [size, setSize] = useState<number>()

    useEffect(() => {
        const fetchData = async () => {
            setName(await contract.name());
            const size = await contract.totalSize();
            console.log(size)
            setSize(size.toNumber());
        }
        fetchData()
    })


    return (
        <Container>
            <Typography variant="h1" gutterBottom>
                {name}
            </Typography>


            <Typography variant="overline" display="block" gutterBottom>
                you have {size} friends.
            </Typography>
        </Container>
    )

}

export default ContractDetail;