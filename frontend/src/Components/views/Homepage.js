import React, {useEffect, useState} from 'react';
import axios from 'axios';
import moment from 'moment';
import { Container, Box, Text,SimpleGrid, Image, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button, Link, useToast, Flex } from '@chakra-ui/react'


function Homepage() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/video/fetch/videos').then(response => {
            if(response.data.success) {
                setVideos(response.data.videos);
            } else {
                alert("Failed to retrieve videos");
            }
        })
    }, [])

    

    const renderCards = videos.map((video, index) => {

        console.log(video);

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);
        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        return(
    <Box>
    <Link href={`/video/${video._id}`} mb={0}>
                <Image src={`http://localhost:4000/${video.thumbnail}`} alt="no-thubnail" />
                <Box color="white" bg="gray" w="20%" borderRadius="md" position="relative" left={225} bottom={8}>
                <Text ml="2">{minutes} : {seconds}</Text> 
                </Box>
                </Link>
                <Box>
                <Text>{video.writer.name}</Text>
                <Text>{video.views} views </Text>
                <Text>{moment(video.createdAt).format("MMM DD YYYY")}</Text>
                </Box>
                </Box>
                
            
               
            
        )
        
    })

    return(
    <Container maxW='5xl' centerContent>
    <Box d='block' p={3} bg={"white"} w="100%" mt="20px" borderRadius="lg" borderWidth="1px">
    <Container maxW='5xl' d="flex">
    <Box w="100%" d="flex" flex-direction="column" flex={1.0}>
    <Box d="block">
    <SimpleGrid columns={3} spacing={10}>
    {renderCards}
</SimpleGrid>
    
    
    </Box>
    </Box>
    </Container>
    </Box>
    </Container>
    )
}

export default Homepage