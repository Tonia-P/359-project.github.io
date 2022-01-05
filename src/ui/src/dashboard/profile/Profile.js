import React, { useState, useEffect } from 'react';
import UpdateInput from '../../components/updatefields/UpdateInput';
import UpdateDisabled from '../../components/updatefields/UpdateDisabled';
import SettingsTab from '../../components/SettingsTab';
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
    GridItem,
    Box,
    Avatar,
    Text,
    VStack,
    Divider,
    useColorModeValue,
    Fade, ScaleFade, Slide, SlideFade,
    Collapse,
    useDisclosure,
}from'@chakra-ui/react'

import $ from 'jquery';

import{
    CheckIcon,
    CloseIcon,
    EditIcon
}from'@chakra-ui/icons'
import { Outlet } from 'react-router-dom';

const Profile=({ userInfo , submitForm })=> {

    const { isOpen: accOpen, onToggle: accToggle } = useDisclosure({defaultIsOpen: true});
    const { isOpen: addrOpen, onToggle: addrToggle } = useDisclosure({defaultIsOpen: false});
    const color = useColorModeValue('white', 'gray.700')

    const [info,setUserInfo] = useState({
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
        console.log(userInfo.values);
        setUserInfo({
            firstname: userInfo.firstname,
            username: userInfo.username
        })
    },[userInfo])
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
<Grid templateColumns='repeat(12, 1fr)' gap={4} w='100%' >
    <GridItem colSpan={12} h='20'/>
  <GridItem colSpan={1} h='10' />

    <GridItem w='100%' colSpan={3} borderWidth='1px' borderRadius='3px' bg={color} h='max-content' >
        <VStack
            align='center'
            w='100%'
        >
            <Avatar my='30px' name={ userInfo.username } size='xl' src='https://bit.ly/tioluwani-kolawole' />
            <Text w='100%'> { userInfo.username } </Text>
            <Text w='100%'> { userInfo.amka } </Text>

            <Divider orientation='horizontal' />
            </VStack>
            <SettingsTab label='Account Info' path = "account"/>
            <SettingsTab label='Address Info' path = "address"/>
            <SettingsTab label='Personal Info' path = "personal"/>
            <SettingsTab label='Additional Info' path = "additional"/>
        
    </GridItem>


    
        <GridItem colSpan={6} h='100%'>

            <Outlet/>
        
        </GridItem>

        
</Grid>




    </>
: <Spinner size='xl' />}
    </>
    )
  }

  
export default Profile;