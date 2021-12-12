import { useState, useEffect } from 'react';
import React from 'react';
import {
  ChakraProvider,
  Box,
  //Text,
  //Link,
  VStack,
  //Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import Form from './register/Form';
import Header from './Header';
import { BrowserRouter as Router, Routes, Route, Link  } from 'react-router-dom'
import LoginForm from './landing/LoginForm';
import Dashboard from './landing/Dashboard';

function App() {


  const [isLogged, setIsLogged] = useState(false);
  const [ userInfo, setUserInfo ] = useState( {  
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  usertype: '',
  doctype: '',
  moredoc: '',
  firstname:'',
  lastname: '',
  birthdate: '',
  gender:'',
  amka:'',
  country:'GR',
  city:'',
  address:'',
  phone:'',
  height:'',
  lon:'0',
  lat:'0',
  weight:'',
  blooddonor:'',
  bloodtype:'Unknown'

});


  function submitForm(values) {
    
    setUserInfo(values);
    console.log("USER INFO IN PAGE!!")
    console.log(values)
    console.log(userInfo)
    setIsLogged(true);
    
  }


  return (
    <ChakraProvider theme={theme}>
      <Router>
      <Header />
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <VStack spacing={8}>




          
          <Routes>
                {!isLogged ?
                <Route path="/login" element={ <LoginForm submitForm= {submitForm} /> } />
                :
                <Route path="/login" element={ <> Yo, you are already logged in, {userInfo.username} </> } />
                }
                <Route path="/register" element={ <Form /> } />
                <Route path="/dashboard" element= { <Dashboard values={ userInfo } />} />
                <Route path="*" element={ <div> Error 404: Page not found. </div> } />
            </Routes>





          </VStack>
        </Grid>
      </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
