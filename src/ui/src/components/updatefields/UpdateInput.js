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
}from'@chakra-ui/react'

import $ from 'jquery';

import { UserContext } from '../../contexts/UserContext';

const UpdateInput=(values)=> {


    const [ isInput, setIsInput ] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [newVals,setNewVals] = useState({
        username: '',
    })
    
    const { userInfo, setUserInfo } = useContext(UserContext);


    const handleChange = e => {
        const { name, value } = e.target;
        setNewVals({
          ...newVals,
          [name]: value
        });
        console.log(newVals);
      };

      const onToggle = () => {
        setIsInput(!isInput);
    }



    useEffect(()=>{
        //console.log(values.values.firstname);
        setNewVals({
            username: userInfo.username
        })
    },[userInfo])


    useEffect(()=>{
        console.log(newVals);
        setIsLoaded(true)
    },[newVals])

    const changeDet = e => {
        e.preventDefault();
        var json_vals = JSON.stringify(newVals);
        console.log("JSON  " + json_vals);

        var urlEnd = 'http://localhost:8080/WebApplication1/UpdateUser';
        $.ajax({
            url: urlEnd,
            type: "POST",
            contentType: 'json',
            data: json_vals,
            success: function (result) {
                console.log(result);
                onToggle();
                setUserInfo(newVals[values.name])
                console.log(userInfo);

            },
            error: function (result) {
                console.log(result.responseText)
            }
        });
    }

  
    return (
    <>
    
    {!isInput ?
    <Grid templateColumns='repeat(14, 1fr)' gap={4} rowGap={2} w='100%' px='4' py='1'>
        <GridItem colSpan={14} textAlign='start'>
            <Text fontSize='sm' >{ values.name }</Text>
        </GridItem>
        
        <GridItem colSpan={10} textAlign='start'>
            <Text fontSize='lg' >{ userInfo[values.name] }</Text>
        </GridItem>

        <GridItem colSpan={4} textAlign='start'>
            <Link color='teal.500' fontSize='md' onClick={onToggle}>
                Change
            </Link>
        </GridItem>
    </Grid>

    :
       
    <Grid templateColumns='repeat(14, 1fr)' gap={4} rowGap={2} w='100%' px='4' py='1'>
        <GridItem colSpan={10} size='lg'>
            <FormControl>
                <FormLabel htmlFor='name' fontSize='sm'>{ values.name }</FormLabel>
                <Input
                name = {values.name}
                type = 'text'
                defultValue={ userInfo[values.name] }
                value={ newVals.value }  
                autoComplete='on' 
                size='md'
                onChange = { handleChange } 
                />
            </FormControl>
        </GridItem>
        
        <GridItem colSpan={2}>
            <Button size='sm' type = "submit" colorScheme='teal' onClick={changeDet} top='45%'>
                Confirm
            </Button>
        </GridItem>
        <GridItem colSpan={2}>
            <Button size='sm' variant='outline' colorScheme='teal' onClick={onToggle} top='45%'>
                Cancel
            </Button>
        </GridItem>
    </Grid>

}
    </>
    )
  }

  
export default UpdateInput;