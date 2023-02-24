import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Box, Text,SimpleGrid, Image, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button, Link, useToast, Flex, VStack, HStack, Spacer } from '@chakra-ui/react'
import LikeDislike from './LikeDislike';

function DetailVideoPage(props) {

    const videoId = props.match.params.videoId;
    const [video, setVideo] = useState([]);

    const videoVariable = {
        videoId: videoId
    }

    useEffect(() => {
        axios.post('http://localhost:4000/api/video/fetch/video', videoVariable).then(response => {
            if(response.data.success) {
                setVideo(response.data.video);
            } else {
                alert("Failed to get video info!");
            }
        })
    }, [])

    if (video.writer) {
        return (
    <Container maxW='8xl'>
    <Box d='block' p={3} bg={"white"} w="100%" mt="20px" borderRadius="lg" borderWidth="1px">
    <Container maxW='5xl' d="flex">
    <Box w="100%" d="flex">
    <Box d="block">
    <div className="postPage" style={{ width: '100%', padding: '1rem 4em' }}>
    <video id={`${video.filePath}`} style={{ width: '100%' }} src={`http://localhost:4000/${video.filePath}`} controls autoplay></video>

    </div>

    <HStack>
    <VStack>
        <Text fontSize="3xl">{video.title}</Text>
        <Text>{video.views} views</Text>
        <Text>{video.description}</Text>
    </VStack>

    <Spacer />

    <LikeDislike video videoId={videoId} userId={JSON.parse(localStorage.getItem("userInfo"))._id} />
    </HStack>

    
    
    </Box>
    </Box>
    </Container>
    </Box>
    </Container>
                    
        )

    } else {
        return (
            <div>Loading...</div>
        )
    }

}

export default DetailVideoPage