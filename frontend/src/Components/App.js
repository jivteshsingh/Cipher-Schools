import React, {useState} from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import LoginPage from "./views/LoginPage.js";
import SignupPage from "./views/SignupPage"
import { BrowserRouter, Route } from 'react-router-dom';
import "./App.css";
import UploadVideoPage from './views/UploadVideoPage.js';

function App() {
  const [user,setUser] = useState();
  return (

    <ChakraProvider>
      <BrowserRouter>
      <div className='App'>
      <Route path="/" component={LoginPage} exact />
      <Route path="/signup" component={SignupPage} exact />
      <Route path="/upload" component={UploadVideoPage} exact />
      
      </div>
      </BrowserRouter>
      </ChakraProvider>
     
 
   
  );
}

export default App;
