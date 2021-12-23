import React, { useState, useEffect } from 'react';
import UpdateSelectCountry from '../components/UpdateSelectCountry';
import UpdateInput from '../components/UpdateInput';
import UpdateSelectBloodType from '../components/UpdateSelectBloodType';
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
    GridItem
}from'@chakra-ui/react'

import $ from 'jquery';

import{
    CheckIcon,
    CloseIcon,
    EditIcon
}from'@chakra-ui/icons'

const Profile=(values)=> {
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
    useEffect(()=>{
        console.log(values.values.firstname);
        setUserInfo({
            firstname: values.values.firstname,
            username: values.values.username
        })
    },[values.values])
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
  
    return (<>
    {isLoaded ? <>

        <UpdateInput/>
        <UpdateSelectCountry/>
        <UpdateSelectBloodType/>

    </>
: <Spinner size='xl' />}
    </>
    )
  }

  
export default Profile;