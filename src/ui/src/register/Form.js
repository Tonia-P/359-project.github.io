import React, { useState } from 'react';
import RegisterForm from './SignUpForm';
import FormSuccess from './SignUpSuccess';

const Form = () => {


  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ userInfo, setUserInfo ] = useState();

  function submitForm(values) {
    setIsSubmitted(true);
    setUserInfo(values);
  }


  return (
    <>
        {!isSubmitted ? (
          <RegisterForm submitForm={ submitForm } />
        ) : (
          <FormSuccess values = { userInfo } />
        )}
    </>
  );
};

export default Form;