import LoginForm from "./LoginForm";
import React, { useState, useEffect } from 'react';
import Dashboard from "./Dashboard";

const LoginPage = (isLogged, callback) => {

  function submitForm(values) {
    callback(values);
  }

  
    return (
      <>
          {!isLogged.isLogged ? (
            <LoginForm submitForm={ submitForm } />
          ) : (
            <> 
              You shall not log again. 
            </> 
          )}
      </>
    );
  };
  
  export default LoginPage;