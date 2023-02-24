import { HStack, Link, Spacer, Text } from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router-dom';

function Navbar () {

    const history = useHistory();


        const logoutHandler = () => {
            localStorage.removeItem("userInfo");
            history.push("/");
          }


    return(
        <div style={{marginBottom:"5px"}}>
        <HStack>
            <Text fontSize="2xl">
            <Link href="/homepage">VIDEO PLAYER</Link>
            </Text>
            <Spacer />
            <Text >
                <Link href="/upload/video">
                Upload
                </Link>
            </Text>
            <Text >
                <Link onClick={logoutHandler}>Logout</Link>
                </Text>
        </HStack>
        </div>
    )
}

export default Navbar;