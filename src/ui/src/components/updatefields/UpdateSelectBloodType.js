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
    InputLeftElement,
    Select,
    GridItem
}from'@chakra-ui/react'

import $ from 'jquery';

import{
    CheckIcon,
    CloseIcon,
    EditIcon
}from'@chakra-ui/icons'

const UpdateSelectBloodType=(values)=> {
    const [userInfo,setUserInfo] = useState({
        username: '',
        firstname: ''
    })
    const [isLoaded, setIsLoaded] = useState(false);
    const handleChange = e => {
        const { name, value } = e.target;
        setUserInfo({
          ...userInfo,
          [name]: value
        });
        console.log(userInfo.firstname);
      };
    /*useEffect(()=>{
        console.log(values.values.firstname);
        setUserInfo({
            firstname: values.values.firstname,
            username: values.values.username
        })
    },[values.values])
    useEffect(()=>{
        console.log(userInfo.firstname);
        setIsLoaded(true)
    },[userInfo])*/

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
  
    return (<>

        <Grid templateColumns='repeat(10, 1fr)' gap={4} rowGap={2}>

        <GridItem rowStart={3} colSpan={4} size='lg'>
            <FormControl>
                    <FormLabel>Blood type</FormLabel>
                    <Select 
                        placeholder='Select option'
                        borderWidth='0'
                        borderBottom='1px'
                        borderRadius='0'
                    >
                        <option onChange= {handleChange} value='A+'>A+</option>
                        <option onChange= {handleChange} value='A-'>A-</option>
                        <option onChange= {handleChange} value='B+'>B+</option>
                        <option onChange= {handleChange} value='B-'>B-</option>
                        <option onChange= {handleChange} value='AB+'>AB</option>
                        <option onChange= {handleChange} value='AB-'>AB</option>
                        <option onChange= {handleChange} value='0+'>0+</option>
                        <option onChange= {handleChange} value='0-'>0-</option>
                        <option onChange= {handleChange} value='unknown'>Unknown</option>
                    </Select>
            </FormControl>
        </GridItem>
        
        <GridItem rowStart={3} colStart={5} colEnd={6}>
            <Button size='md' type = "submit" colorScheme='teal' onClick={changeDet} top='45%'>
                Change
            </Button>
        </GridItem>
        </Grid>
    </>
    )
  }

  
export default UpdateSelectBloodType;