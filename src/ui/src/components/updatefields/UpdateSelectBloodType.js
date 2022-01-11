import React, { useState } from 'react';
import{
    FormControl,
    FormLabel,
    Button,
    Grid,
    Select,
    GridItem
}from'@chakra-ui/react'

import $ from 'jquery';

const UpdateSelectBloodType=()=> {
    const [userInfo,setUserInfo] = useState({
        username: '',
        firstname: ''
    })


    const handleChange = e => {
        const { name, value } = e.target;
        setUserInfo({
          ...userInfo,
          [name]: value
        });
        console.log(userInfo.firstname);
      };

    const changeDet = e => {
        e.preventDefault();
        var json_vals = JSON.stringify(userInfo);

        var urlEnd = 'http://localhost:8080/WebApplication1/UpdateUser';
        $.ajax({
            url: urlEnd,
            type: "POST",
            contentType: 'json',
            data: json_vals,
            success: function (result) {
                console.log(result);
                console.log(userInfo);
            },
            error: function (result) {
                console.log(result.responseText)
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