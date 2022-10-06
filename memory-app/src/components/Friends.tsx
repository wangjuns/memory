import { Container, Skeleton } from "@mui/material";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useEffect, useState } from "react";
import AppContext from "./AppContext";

function ipfsUrl(uri: string) {
    return `https://ipfs.io/ipfs/${uri.split("://")[1]}`;
}

interface Friend {
    name: string;
    description: string;
    image: string;
}

function Friends({ context }: { context: AppContext }) {

    const contract = context.contract!;

    const [friends, setFriends] = useState(new Map<number, Friend>());
    const [friendSize, setFriendSize] = useState<number>(0);

    useEffect(() => {

        console.log("run")
        const fetchData = async () => {
            const size = await contract.totalSupply();
            setFriendSize(size.toNumber())

            for (let i = 0; i < size.toNumber(); i++) {
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
                        setFriends(old => new Map([...old, [i, value]]))
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
            <ImageList cols={3} gap={8}>
                {Array.from(new Array(friendSize).keys()).map((idex) => (
                    <>
                        {friends.has(idex) ? (<ImageListItem sx={{ height: 400 }} key={idex} >
                            <img
                                src={`${imageUrl(friends.get(idex)!.image)}`}
                                srcSet={`${imageUrl(friends.get(idex)!.image)}`}
                                alt={friends.get(idex)!.name}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title={friends.get(idex)!.description}
                            />
                        </ImageListItem>) : (<Skeleton variant="rectangular" sx={{ height: 400 }} />)}
                    </>
                ))}
            </ImageList>

        </Container >
    )
}

export default Friends;