import React, { useState, useEffect, useContext } from 'react';
import {
    Box,
    Link,
    FormControl,
    Input,
    VStack
  } from '@chakra-ui/react';
  import $ from 'jquery';
  import { MapContext } from '../../contexts/MapContext'
  import dayjs from 'dayjs'


const DocList = (values, isLogged) => {




    const { selectedDoctor, setIsBooking } = useContext(MapContext)


    const handleCancel = () => {
      setIsBooking(false)
    }


  
    return (

        <>


<Link color='teal.500' onClick={handleCancel} href='#' w='100%' textAlign='start' h='50px' >
    {'<'} Cancel booking
  </Link>

       
        <VStack  spacing='0px' overflow-y='scroll'>
            { selectedDoctor.username}
            <Box h='100px'></Box>
            <FormControl isRequired id= "birthdate">
                <Input 
                    type= "date" 
                    name= "birthdate"
                    autoComplete= "on"
                    min={dayjs().format('YYYY-MM-DD')}
                    value= {values.birthdate}
                    placeholder= "birthdate"
                    minLength="3"
                    maxLength= "30"
                    />
            </FormControl>
         </VStack>
        




        </>

    );
  };
  
  export default DocList;