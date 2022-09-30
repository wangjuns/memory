import { IconButton, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import AppContext from "./AppContext";
import GroupAddIcon from '@mui/icons-material/GroupAdd';

interface ContractDetailProps {
    context: AppContext;
    onAddClick: () => void;
}

function ContractDetail({ context, onAddClick }: ContractDetailProps) {

    const contract = context.contract!;

    const [name, setName] = useState<string>()
    const [size, setSize] = useState<number>()

    useEffect(() => {
        const fetchData = async () => {
            setName(await contract.name());
            const size = await contract.totalSupply();
            setSize(size.toNumber());
        }
        fetchData()
    })


    return (
        <Container>
            <Typography variant="h1" gutterBottom>
                {name}
                <IconButton onClick={() => onAddClick()} >
                    <GroupAddIcon />
                </IconButton>
            </Typography>


            <Typography variant="overline" display="block" gutterBottom>
                you have {size} friends.
            </Typography>
        </Container>
    )

}

export default ContractDetail;