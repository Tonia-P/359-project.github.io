import React from 'react';
import {
  Button
} from '@chakra-ui/react'


import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const LoginPage = (isLogged, callback) => {

  function submitForm(values) {
    callback(values);
  }
    return (
      <>
          {!isLogged.isLogged ? (<>

            <label>Login Options:</label>
            <Button colorScheme='blue' size='lg' w='30%' h='20%'><Link to="/login">Login  User</Link></Button>
            <Button colorScheme='red' size='lg' w='29.8%' h='20%'><Link to="/loginAdmin">Login Admin</Link></Button>
            </>
          ) : (
            <> 
              You shall not log again. 
            </> 
          )}
      </>
    );
  };
  
  export default LoginPage;