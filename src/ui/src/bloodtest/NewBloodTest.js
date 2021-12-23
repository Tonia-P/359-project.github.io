import { useState, useEffect } from 'react';
import React from 'react';
import $ from 'jquery';
import { 
    Stack, 
    Button, 
    FormControl, 
    FormLabel, 
    FormHelperText,
    Input, 
    FormErrorMessage,
    InputGroup,
    InputRightElement,
    Radio,
    HStack,
    RadioGroup,
    Select,
    Grid,
    NumberInput,
    NumberInputField,
    Checkbox,
    Textarea,
    Text
} from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route, Link  } from 'react-router-dom'
import NewBloodTestControl from './NewBloodTestControl';




const NewBloodTest = () =>{

    const { handleChange, handleSubmit, values, errors, setValues, isSubmitting } = NewBloodTestControl(
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