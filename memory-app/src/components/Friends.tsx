import { Container } from "@mui/material";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useEffect, useState } from "react";
import AppContext from "./AppContext";

function ipfsUrl(uri: string) {
    return `https://ipfs.io/ipfs/${uri.split("://")[1]}`;
}

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
                let url = uri;
                if (uri.startsWith("ipfs://")) {
                    url = ipfsUrl(uri)
                }

                fetch(url)
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


    function imageUrl(uri: string) {
        if (uri.startsWith("ipfs://")) {
            return ipfsUrl(uri);
        } else {
            return uri;
        }
    }


    return (
        <Container>
            <ImageList sx={{ width: 500, height: 450 }}>
                {friends.map((item, idex) => (
                    <ImageListItem key={idex}>
                        <img
                            src={`${imageUrl(item.image)}`}
                            srcSet={`${imageUrl(item.image)}`}
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