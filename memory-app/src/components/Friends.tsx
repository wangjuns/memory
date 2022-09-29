import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import AppContext from "./AppContext";
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

function Friends({ context }: { context: AppContext }) {

    const contract = context.contract!;

    const [friends, setFriends] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const size = await contract.totalSupply();

            for (let i = 0; i < size; i++) {
                const uri: string = await contract.tokenURI(i);
                fetch(`https://gateway.pinata.cloud/ipfs/${uri}`)
                    .then(resp => {
                        console.log(resp)
                        return resp.json()
                    })
                    .then(value => {
                        console.log(value)
                        setFriends([value, ...friends,])
                    })
            }

        }

        fetchData()
    }, [])


    return (
        <Container>
            <ImageList sx={{ width: 500, height: 450 }}>
                {friends.map((item) => (
                    <ImageListItem key={item.title}>
                        <img
                            src={`${item.img}?w=248&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={item.title}
                            subtitle={item.properties.bless.description}
                        />
                    </ImageListItem>
                ))}
            </ImageList>

        </Container>
    )
}

export default Friends;