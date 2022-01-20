import React, { useState, useEffect, useContext } from 'react';
import {
    Text,
    SimpleGrid,
    Spinner,
    Box,
    VStack
  } from '@chakra-ui/react';
  import DocRow from './DocRow';
  import $ from 'jquery';
  import { MapContext } from '../../contexts/MapContext'



const DocList = (values, isLogged) => {




    const { allDoctors } = useContext(MapContext)

  
    return (

        <>


        <Box background='gray.800' w='100%' h='60px' display='flex' alignItems='center' justifyContent='center'>
          <Text >All doctors</Text>
        </Box>

       
        <VStack  spacing='0px' overflow='scroll'>
            {allDoctors.map(doctor => <DocRow doctor={doctor} key={doctor.doctor_id} />)}
            <Box h='100px'></Box>
         </VStack>
        




        </>

    );
  };
  
  export default DocList;