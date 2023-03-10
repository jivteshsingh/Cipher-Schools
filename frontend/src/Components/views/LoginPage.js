import React, { useState } from "react";
import { Container, Box, Text, VStack, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button, Link, useToast } from '@chakra-ui/react'
import axios from "axios";
import { useHistory } from 'react-router-dom';


function LoginPage() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { user, setUser } = useState();
  const history = useHistory();

  const [show, setShow] = useState(false)
  function handleClick(){
    setShow(!show);
  }


  const submitHandler = async() => {
      setLoading(true);
      if(!email || !password) {
        toast({ title: "Please Fill all the Fields", status: "warning", duration: 5000, isClosable: true, position: "bottom", });
        setLoading(false);
        return;
      }


      try {
        const config = {headers:{"Content-type": "application/json",},};
        const { data } = await axios.post("http://localhost:4000/api/user/login",{email,password},config);
        history.push("/homepage");
        console.log(JSON.stringify(data));
        toast({ title: "Login is Successful", status: "success", duration: 5000, isClosable: true, position: "bottom", });

       localStorage.setItem("userInfo",JSON.stringify(data));

       setLoading(false);

       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
       setUser(userInfo);
      
      } catch (e) {
          toast({ title: "Error Occured!", description: e.response.data.message, status: "error", duration: 5000, isClosable: true, position: "bottom", });
          setLoading(false);
      }
  }

    return(
    <Container maxW='5xl' centerContent>
    <Box d='block' p={3} bg={"white"} w="100%" mt="155px" borderRadius="lg" borderWidth="1px">
    <Text fontSize='2xl' fontFamily='Work sans' m="15px 20px">VIDEO PLAYER</Text>
    <Container maxW='5xl' d="flex">
    <Box w="100%" d="flex" flex-direction="column" flex={0.50}>
    <Box d="block">
     <Text ml="60px" fontSize="3xl">Sign in your account</Text>
       <VStack spacing="5px">

       <FormControl id="email" isRequired>
       <FormLabel>Email</FormLabel>
       <Input placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)} />
       </FormControl>

       <FormControl id="password" isRequired>
       <FormLabel>Password</FormLabel>
       <InputGroup>
       <Input type={show? "text" : "password"} placeholder="Enter Your Password" onChange={(e) => setPassword(e.target.value)} />
       <InputRightElement width='4.5rem'>
       <Button h='1.75rem' size='sm' onClick={handleClick}>
        {show ? 'Hide' : 'Show'}
       </Button>
       </InputRightElement>
       </InputGroup>
       </FormControl>

       <Button colorScheme='blue' style={{ marginTop:25 }} onClick={submitHandler} isLoading={loading} >Sign In</Button>
       <Text style={{ marginTop:10 }} fontSize="1xl">
       Don't have an account?
       <Link href="/signup" color='teal.500'>Sign up</Link>
       </Text>

       </VStack>
       </Box>
    </Box>
    </Container>
    </Box>
    
    
    
    </Container>
    )
}

export default LoginPage;