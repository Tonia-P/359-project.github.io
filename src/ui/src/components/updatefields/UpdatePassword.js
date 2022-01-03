import React, { useState, useEffect } from 'react';
import{
    Editable,
    EditableInput, 
    EditablePreview,
    useEditableControls,
    ButtonGroup,
    IconButton,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
    Spinner,
    Flex,
    InputRightElement,
    InputGroup,
    Stack,
    Grid,
    Box,
    Text,
    Link,
    InputLeftElement,
    GridItem,
    Skeleton
}from'@chakra-ui/react'

import $ from 'jquery';

import{
    CheckIcon,
    CloseIcon,
    EditIcon
}from'@chakra-ui/icons'

const UpdatePassword=({ password })=> {


    const [ isInput, setIsInput ] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [userInfo,setUserInfo] = useState({
        username: '',
        fieldVal: ''
    })
    const [passCensored, setPassCensored ] = useState('*');


    useEffect (() => {

        for (var i=0; i<password.size; i++){
            setPassCensored(passCensored+"*")
            console.log(passCensored)
        }
        
    }, [password])


    const handlePass = () =>{
        console.log(password);
        for (var i=0; i<password.size; i++){
            setPassCensored(passCensored+"*")
            console.log(passCensored)
        }
        console.log(passCensored)
        
    }

    useEffect (() => {

        if(passCensored.size === password.size) setIsLoaded(true)
        
    }, [passCensored])


    


    const handleChange = e => {
        const { name, value } = e.target;
        setUserInfo({
          ...userInfo,
          [name]: value
        });
        console.log(userInfo.firstname);
      };



/*
    useEffect(()=>{
        console.log(userInfo.firstname);
        setIsLoaded(true)
    },[userInfo])

    const changeDet = e => {
        e.preventDefault();
        var json_vals = JSON.stringify(userInfo);
        //console.log("JSON  " + json_vals);

        var urlEnd = 'http://localhost:8080/WebApplication1/UpdateUser';
        $.ajax({
            url: urlEnd,
            type: "POST",
            contentType: 'json',
            data: json_vals,
            success: function (result) {
                console.log(result);
                //const json = JSON.parse(result.responseText)
                //console.log(json);
                //setUserInfo(json)
                console.log(userInfo);
            },
            error: function (result) {
                console.log(result.responseText)
                //var json = JSON.parse(result.responseText)
                //console.log(json)
            }
        });
    }

*/

    const onToggle = () => {
        setIsInput(isInput => !isInput);
    }

    

  
    return (
    <>
    
    <Grid templateColumns='repeat(14, 1fr)' gap={4} rowGap={2} w='100%' px='4' py='1'>
        <GridItem colSpan={14} textAlign='start'>
            <Text fontSize='sm' >Password</Text>
        </GridItem>
        
        <GridItem colSpan={10} textAlign='start'>
            {isLoaded ? <Text fontSize='lg' type='password' >{ passCensored }</Text>
            :
            <Text fontSize='lg' type='password' >zz.</Text>
    }
        </GridItem>

        <GridItem colSpan={4} textAlign='start'>
            <Link color='teal.500' fontSize='md' onClick={onToggle}>
                Change
            </Link>
        </GridItem>
    </Grid>




       
    <Grid templateColumns='repeat(14, 1fr)' gap={4} rowGap={2} w='100%' px='4' py='1'>
        <GridItem colSpan={14} size='lg'>
            <FormControl>
                <FormLabel htmlFor='name' fontSize='sm'>New password</FormLabel>
                <Input
                name = 'firstname'
                type = 'text'
                value={password}  
                autoComplete='on' 
                size='sm'
                onChange = {handleChange} 
                />
            </FormControl>
        </GridItem>

        <GridItem colSpan={14} size='lg'>
            <FormControl>
                <FormLabel htmlFor='name' fontSize='sm'>Confirm password</FormLabel>
                <Input
                name = 'firstname'
                type = 'text'
                value={password}  
                autoComplete='on' 
                size='sm'
                onChange = {handleChange} 
                />
            </FormControl>
        </GridItem>
        
        <GridItem colSpan={3} />
        <GridItem colSpan={2}>
            <Button size='sm' w='100%' type = "submit" colorScheme='teal'  top='45%'>
                Confirm
            </Button>
        </GridItem>
        <GridItem colSpan={2} />
        <GridItem colSpan={2}>
            <Button size='sm' w='100%' variant='outline' colorScheme='teal' onClick={onToggle} top='45%'>
                Cancel
            </Button>
        </GridItem>
        <GridItem colSpan={3} />
    </Grid>

    </>
    )
  }

  
export default UpdatePassword;