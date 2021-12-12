import LoginForm from "./LoginForm";
import React, { useState, useEffect } from 'react';
import Dashboard from "./Dashboard";

const LoginPage = (isLogged, callback) => {


  useEffect(
    () => {
      console.log("aa");
      console.log(isLogged)
    },
    []
  );

  function submitForm(values) {
    callback(values);
  }

  
    return (
      <>
          {!isLogged.isLogged ? (
            <LoginForm submitForm={ submitForm } />
          ) : (
            <> 
        No log

            
            </> 
          )}
      </>
    );
  };
  
  export default LoginPage;