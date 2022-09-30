import { Container } from "@mui/material";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useEffect, useState } from "react";
import AppContext from "./AppContext";

function Friends({ context }: { context: AppContext }) {

    const contract = context.contract!;

    const [friends, setFriends] = useState<any[]>([]);

    useEffect(() => {

        console.log("run")
        const fetchData = async () => {
            const size = await contract.totalSupply();
            setFriends([])

            for (var i = 0; i < size.toNumber(); i++) {
                const uri: string = await contract.tokenURI(i);
                fetch(uri)
                    .then(resp => {
                        return resp.json()
                    })
                    .then(value => {
                        setFriends(old => [value, ...old])
                    })
            }

        }

        fetchData()
    }, [])


    return (
        <Container>
            <ImageList sx={{ width: 500, height: 450 }}>
                {friends.map((item, idex) => (
                    <ImageListItem key={idex}>
                        <img
                            src={`${item.image}`}
                            srcSet={`${item.image}`}
                            alt={item.name}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={item.name}
                            subtitle={item.description}
                        />
                    </ImageListItem>
                ))}
            </ImageList>

        </Container>
    )
}

export default Friends;