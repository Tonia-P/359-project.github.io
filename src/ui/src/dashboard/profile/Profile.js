import React, { useState, useEffect } from 'react';
import UpdateSelectCountry from '../../components/UpdateSelectCountry';
import UpdateInput from '../../components/UpdateInput';
import UpdateSelectBloodType from '../../components/UpdateSelectBloodType';
import UpdateDisabled from '../../components/UpdateDisabled';
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
    SlideFade ,
    useDisclosure
}from'@chakra-ui/react'

import $ from 'jquery';

import{
    CheckIcon,
    CloseIcon,
    EditIcon
}from'@chakra-ui/icons'

const Profile=(values)=> {

    const { isOpen, onToggle } = useDisclosure()

    const color = useColorModeValue('white', 'gray.700')
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
<Grid templateColumns='repeat(12, 1fr)' gap={4} w='100%' >
    <GridItem colSpan={12} h='20'/>
  <GridItem colSpan={1} h='10' />

    <GridItem w='100%' colSpan={3} borderWidth='1px' borderRadius='3px' bg={color}  >
        <VStack
            spacing={4}
            align='center'
            w='100%'
        >
            <Avatar my='30px' name={ values.values.username } size='xl' src='https://bit.ly/tioluwani-kolawole' />
            <Text w='100%'> Usernamexxxxx </Text>
            <Text w='100%'> AMKA </Text>

            <Divider orientation='horizontal' />
            <Button onClick={onToggle}>
                Kappapa
            </Button>
        </VStack>
    </GridItem>


    
        <GridItem colSpan={6}>
        <SlideFade  direction='bottom' in={isOpen} style={{ zIndex: 10 }}>
        <Box borderWidth='1px' borderRadius='3px'  bg={color}>
          <Box bg='teal.400' h='50px' p={3} textAlign='start' borderRadius='3px' >
              <Text >Account Info</Text>
          </Box>
          <VStack
                spacing={4}
                align='center'
                w='100%'
            >
                <UpdateDisabled w = '100%' values={ ['Username', 'Tonia'] } />
                <UpdateInput w='100%'  values={{ name: 'email', value: 'csd3878@csd.uoc.gr' }}/>
          </VStack>
          </Box>
          </SlideFade>
        </GridItem>
</Grid>




    </>
: <Spinner size='xl' />}
    </>
    )
  }

  
export default Profile;