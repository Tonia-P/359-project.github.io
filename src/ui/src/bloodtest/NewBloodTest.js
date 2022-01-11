import React from 'react';
import { 
    Stack,
    FormControl, 
    FormLabel, 
    FormHelperText,
    Input, 
    FormErrorMessage
} from '@chakra-ui/react'
import NewBloodTestControl from './NewBloodTestControl';




const NewBloodTest = () =>{

    const { handleChange,  values, errors } = NewBloodTestControl(
    );
    

    return (
        <Stack>
            <FormControl isRequired id= "username" isInvalid={errors.username}>
                <FormLabel>Username</FormLabel>
                <Input 
                    type= "text" 
                    name= "username"
                    autoComplete= "on"
                    value= {values.username}
                    onChange= {handleChange} 
                    placeholder= "Username"
                    minLength="8"
                    />
                <FormHelperText>Please enter an username of at least 8 characters.</FormHelperText>
                <FormErrorMessage >{errors.username}</FormErrorMessage>
            </FormControl>
        </Stack>
    )
}

export default NewBloodTest;