import React, { useEffect, useState } from 'react';
import { Container, Box, Text, Select, VStack, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button, Link, useToast } from '@chakra-ui/react'
import axios from "axios";

function SignupPage() {
   const [show, setShow] = useState(false)
    function handleClick(){
      setShow(!show);
    }
    
    const [showconfirm, setShowconfirm] = useState(false)
    function handleClickconfirm(){
      setShowconfirm(!showconfirm);
    }
    
      const [name, setName] = useState();
      const [email, setEmail] = useState();
      const [confirmpassword, setConfirmpassword] = useState();
      const [password, setPassword] = useState();
      const [loading, setLoading] = useState(false);
      const toast = useToast();
      const [isCreator,setIsCreator] = useState(false);
      const { user, setUser } = useState();

      const roleHandler = (e) => {
        if(e.target.value === "option1"){
            setIsCreator(true);
        }else if(e.target.value === "option2"){
            setIsCreator(false);
    }
      }
    
    
    
         const submitHandler = async() => {
             setLoading(true);
             if(!name || !email || !password || !confirmpassword) {
               toast({ title: "Please Fill all the Fields", status: "warning", duration: 5000, isClosable: true, position: "bottom", });
               setLoading(false);
               return;
             }
    
             if(password !== confirmpassword){
                toast({ title: "Passwords Do Not Match", status: "warning", duration: 5000, isClosable: true, position: "bottom", });
             }
    
             try {
               const config = {headers:{"Content-type": "application/json",},};
               const { data } = await axios.post("http://localhost:4000/api/user",{name,email,password,isCreator},config);
               toast({ title: "Registration is Successful", status: "success", duration: 5000, isClosable: true, position: "bottom", });
    
              localStorage.setItem("userInfo",JSON.stringify(data));
    
              setLoading(false);
    
              const userInfo = JSON.parse(localStorage.getItem("userInfo"));
              setUser(userInfo);
    
             } catch (e) {
                console.log(e);
                 toast({ title: "Error Occured!", description: e.response.data.message, status: "error", duration: 5000, isClosable: true, position: "bottom", });
                 setLoading(false);
             }
         }
    
    
      return(
        <Container maxW='5xl' centerContent>
        <Box d='block' p={3} bg={"white"} w="100%" mt="65px" borderRadius="lg" borderWidth="1px">
        <Text fontSize='2xl' fontFamily='Work sans' m="15px 20px">UIET TALKS</Text>
        <Container maxW='5xl' d="flex">
        <Box w="100%" d="flex" flex-direction="column" flex={0.50}>
        <Box d="block">
         <Text ml="60px" fontSize="3xl">Create your account</Text>
           <VStack spacing="5px">
    
           <FormControl id="first-name" isRequired>
           <FormLabel>Name</FormLabel>
           <Input placeholder="Enter Your Name" onChange={(e) => setName(e.target.value)} />
           </FormControl>
    
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
    
           <FormControl id="confirm password" isRequired>
           <FormLabel>Confirm Password</FormLabel>
           <InputGroup>
           <Input type={showconfirm? "text" : "password"} placeholder="Confirm Password" onChange={(e) => setConfirmpassword(e.target.value)} />
           <InputRightElement width='4.5rem'>
           <Button h='1.75rem' size='sm' onClick={handleClickconfirm}>
            {showconfirm ? 'Hide' : 'Show'}
           </Button>
           </InputRightElement>
           </InputGroup>
           </FormControl>

           <FormControl id="role" isRequired>
           <FormLabel>Role</FormLabel>
           <Select onChange={roleHandler} placeholder='Select Role'>
             <option value='option1'>Creator</option>
             <option value='option2'>Viewer</option>
            </Select>
           </FormControl>
    
           <Button colorScheme='blue' style={{ marginTop:25 }} onClick={submitHandler} isLoading={loading} >Register</Button>
           <Text style={{ marginTop:10 }} fontSize="1xl">
           Already have an account?
           <Link href="/" color='teal.500'>Log in</Link>
           </Text>
    
    
           </VStack>
           </Box>
        </Box>
    
        </Container>
    
        </Box>
        </Container>
      )
}

export default SignupPage;