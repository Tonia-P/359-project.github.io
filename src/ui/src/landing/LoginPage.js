import LoginForm from "./LoginForm";
import React, { useState, useEffect } from 'react';
import Dashboard from "./Dashboard";

import{
  Button
}from'@chakra-ui/react'

import { Link } from 'react-router-dom'

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