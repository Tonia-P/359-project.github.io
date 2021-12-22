import { useState, useEffect } from 'react';
import React from 'react';
import $ from 'jquery';
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
import BloodTestMenu from './bloodtest/Menu';
import AllBloodTests from './bloodtest/AllBloodTests';
import Profile from './dashboard/Profile';

function App() {


  const [isLogged, setIsLogged] = useState(false);
  const [ userInfo, setUserInfo ] = useState({
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


  const submitForm = (values) => {
    
    
    console.log("USER INFO IN PAGE!!")
    console.log(values)
    setUserInfo(values);
    setIsLogged(true);

    var cookie_user = "username = " + values.username + "; expires=Thu, 18 Dec 2022 12:00:00 UTC; path=/";
    var cookie_pass = "password = " + values.password + "; expires=Thu, 18 Dec 2022 12:00:00 UTC; path=/";
    
    document.cookie = cookie_user;
    document.cookie = cookie_pass;
    
  }

  function read_cookie(name) {
    var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
    if(result) return result[1];
    else return null;
   }

  useEffect(

    
    () => {
      //document.cookie = "username=John Smith; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
      let username = read_cookie('username');
      let password = read_cookie('password');

      if (username && password){
        console.log("--Cookies fetched info--");
        console.log(username);
        console.log(password);

        const info = {
          username: username,
          password: password
        }

        var json_vals = JSON.stringify(info);
        //console.log("JSON  " + json_vals);
    
        var urlEnd = 'http://localhost:8080/WebApplication1/LoginUser';
        $.ajax({
            url: urlEnd,
            type: "POST",
            contentType: 'json',
            data: json_vals,
            success: function (result) {
              console.log("Success");
                const json = JSON.parse(result)
                console.log(result);
                setUserInfo(json)
                //console.log(info);
                setIsLogged(true)
            },
            error: function (result) {
                console.log(result.responseText)
                var json = JSON.parse(result.responseText)
                console.log(json)

                setIsLogged(false)
            }
        });

      }


    },
    []
  );


  return (
    <ChakraProvider theme={theme}>
      <Router>
      <Header isLogged= {isLogged} />
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
                <Route path="bloodtest" element= { <BloodTestMenu />} >
                  <Route path="allbloodtests" element={<AllBloodTests />} />
                </Route>
                <Route path="*" element={ <div> Error 404: Page not found. </div> } />
                <Route path="/Profile" element={<Profile values = {userInfo}/>} />
            </Routes>





          </VStack>
        </Grid>
      </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
