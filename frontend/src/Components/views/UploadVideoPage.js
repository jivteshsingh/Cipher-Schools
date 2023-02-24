import React, {useEffect, useState} from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { AddIcon } from '@chakra-ui/icons';
import { Container, Box, Text, VStack, HStack, Image, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button, Link, useToast } from '@chakra-ui/react'

function UploadVideoPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [filePath, setFilePath] = useState("");
    const [duration, setDuration] = useState("");
    const [thumbnail, setThumbnail] = useState("");

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    }

    const handleChangeDecsription = (event) => {
        setDescription(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if(title === "" || description === ""
            || filePath === "" || duration === "" || thumbnail === "") {
            return alert("Fill in all fields before submitting!");
        }

       

        const variables = {
            writer: userInfo._id,
            title: title,
            description: description,
            filePath: filePath,
            duration: duration['fileDuration'],
            thumbnail: thumbnail
        }

        axios.post('http://localhost:4000/api/video/upload/video', variables).then(response => {
            if(response.data.success) {
                alert("Video uploaded successfully!");
            } else {
                alert("Failed to upload video");
            }
        })
    }

    const onDrop = async(files) => {
        let formData = new FormData();
        const config = {
            header: { 'Content-type': 'multipart/form-data' }
        }

       
        
        formData.append('file', files[0]);
        console.log(files[0]);

       axios.post('http://localhost:4000/api/video/upload/files', formData, config).then(response => {

       console.log(response);
            
            if (response.data.success) {
                let variable = {
                    filePath: response.data.filePath,
                    fileName: response.data.fileName
                }
                setFilePath(response.data.filePath);

                // Create the thumbnail to display the uploaded video
                axios.post('http://localhost:4000/api/video/upload/thumbnail', variable).then(response => {
                    console.log(response);
                    if (response.data.success) {
                        setDuration(response.data);
                        setThumbnail(response.data.thumbsFilePath);
                    } else {
                        alert("Failed to create the thumbnail");
                    }
                })
            } else {
                alert("Video failed to save in server");
            }
        })
    }

    return(
      <Container maxW='5xl' centerContent>
    <Box d='block' p={3} bg={"white"} w="100%" mt="100px" borderRadius="lg" borderWidth="1px">
    <Container maxW='5xl' d="flex">
    <Box w="100%" d="flex" flex-direction="column" flex={0.50}>
    <Box d="block">
     <Text ml="60px" mb="15px" fontSize="3xl">Upload Video</Text>
       <VStack spacing="5px">

       <HStack spacing="50px">
        
       <Dropzone
                    onDrop={onDrop}
                    multiple={false}
                    maxSize={800000000}>
                    {({ getRootProps, getInputProps }) => (
                        <div style={{ width: '300px', height: '240px', border: '1px solid ', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                             <AddIcon style={{ fontSize: '3rem', color: '' }} />

                        </div>
                    )}
                </Dropzone>

                {thumbnail !== "" &&
                        <Image src={`http://localhost:4000/${thumbnail}`} alt="no-thubnail" />
                }

</HStack>

       <FormControl id="title" isRequired>

       <FormLabel>Title</FormLabel>
       <Input placeholder="Enter Title" onChange={handleChangeTitle} />
       </FormControl>

       <FormControl id="description" isRequired>
       <FormLabel>Description</FormLabel>
       <Input  placeholder="Enter Description" onChange={handleChangeDecsription} />
       </FormControl>

       <Button colorScheme='blue' style={{ marginTop:25 }} onClick={onSubmit} >Submit</Button>

       </VStack>
       </Box>
    </Box>
    </Container>
    </Box>
    </Container>
        )
}



export default UploadVideoPage