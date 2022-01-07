import React, { useState, useEffect, useContext } from 'react';
import{
    FormControl,
    FormLabel,
    Input,
    Button,
    Grid,
    Text,
    Link,
    GridItem,
    Collapse,
    useDisclosure,
    Skeleton
}from'@chakra-ui/react'

import $ from 'jquery';
import { UserContext } from '../../contexts/UserContext';


const UpdatePassword=({username, password })=> {




    const { isOpen, onToggle } = useDisclosure()
    const [isLoaded, setIsLoaded] = useState(false);
    const [newVals,setNewVals] = useState({
        password: '',
        confirm_password: ''
    })

    const { userInfo } = useContext(UserContext)




    const handleChange = e => {
        const { name, value } = e.target;
        setNewVals({
          ...newVals,
          [name]: value
        });
        console.log(newVals);
      };


      useEffect(()=>{
        setNewVals({
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
                onToggle();
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

    

  
    return (
    <>
    
    <Grid templateColumns='repeat(14, 1fr)' gap={4} rowGap={2} w='100%' px='4' py='4'>
        <GridItem colSpan={14} textAlign='start'>
            <Text fontSize='sm' >Password</Text>
        </GridItem>
        
        <GridItem colSpan={10} textAlign='start'> 
            <Text fontSize='lg' type='password' 
                textShadow= '0 0 7px white'
                color= 'transparent'
                _hover = {{ textShadow: '0 0 0px white', color: 'white' }}
            >
                { userInfo.password }
            </Text>
        </GridItem>

        <GridItem colSpan={4} textAlign='start'>
            <Link color='teal.500' fontSize='md' onClick={onToggle}>
                Change password
            </Link>
        </GridItem>
    </Grid>




    <Collapse in={isOpen} animateOpacity>
    <Grid templateColumns='repeat(14, 1fr)' gap={4} rowGap={2} w='100%' px='4' py='1'>
        <GridItem colSpan={14} size='lg'>
            <FormControl>
                <FormLabel htmlFor='name' fontSize='sm'>New password</FormLabel>
                <Input
                name = 'password'
                type = 'password'
                value={newVals.password}  
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
                name = 'confirm_password'
                type = 'password'
                value={newVals.confirm_password}  
                autoComplete='on' 
                size='sm'
                onChange = {handleChange} 
                />
            </FormControl>
        </GridItem>
        
        <GridItem colSpan={2} />
        <GridItem colSpan={3}>
            <Button size='sm' w='100%' type = "submit" colorScheme='teal' m='20px' onClick={changeDet}>
                Confirm
            </Button>
        </GridItem>
        <GridItem colSpan={3} />
        <GridItem colSpan={3}>
            <Button size='sm' w='100%' variant='outline' colorScheme='teal' onClick={onToggle} m='20px' >
                Cancel
            </Button>
        </GridItem>
        <GridItem colSpan={2} />
    </Grid>

    </Collapse>

    </>
    )
  }

  
export default UpdatePassword;