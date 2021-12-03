import React from 'react';
import { CheckCircleIcon } from '@chakra-ui/icons'
import { Stack } from '@chakra-ui/react'


const FormSuccess = () => {
  return (
    
    <Stack maxWidth= {1000} margin= "auto" spacing={7} marginTop= {5} align= 'center'>
      <CheckCircleIcon w={100} h={100}  />
      <div className='form-content-right'>
        <h1 className='form-success'>We have received your request!</h1>
      </div>
    </Stack>
  );
};

export default FormSuccess;