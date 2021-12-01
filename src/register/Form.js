import React, { useState } from 'react';
import RegisterForm from './SignUpForm';
import FormSuccess from './SignUpSuccess';

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <>
        {!isSubmitted ? (
          <RegisterForm submitForm={submitForm} />
        ) : (
          <FormSuccess />
        )}
    </>
  );
};

export default Form;