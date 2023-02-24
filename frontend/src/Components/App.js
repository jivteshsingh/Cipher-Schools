import React, {useState} from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import LoginPage from "./views/LoginPage.js";
import SignupPage from "./views/SignupPage"
import { BrowserRouter, Route } from 'react-router-dom';
import "./App.css";
import UploadVideoPage from './views/UploadVideoPage.js';
import Homepage from './views/Homepage.js';
import DetailVideoPage from './views/DetailVideoPage.js';

function App() {
  return (

    <ChakraProvider>
      <BrowserRouter>
      <div className='App'>
      <Route path="/" component={LoginPage} exact />
      <Route path="/signup" component={SignupPage} exact />
      <Route path="/upload/video" component={UploadVideoPage} exact />
      <Route path="/homepage" component={Homepage} exact />
      <Route path="/video/:videoId" component={DetailVideoPage} exact/>
      </div>
      </BrowserRouter>
      </ChakraProvider>
     
 
   
  );
}

export default App;
