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
import DocFilter from './DocFilter';



const DocList = (values, isLogged) => {




    const { allDoctors } = useContext(MapContext)

  
    return (

        <>


        <Box background='transparent' backdropBlur={4} zIndex='2' w='100%' h='60px' display='flex' alignItems='center' justifyContent='center'>
          <Text >All doctors</Text>
        </Box>

        <DocFilter/>

       
        <VStack  spacing='0px' overflow-y='scroll'>
            {allDoctors.map(doctor => <DocRow doctor={doctor} key={doctor.doctor_id} />)}
            <Box h='100px'></Box>
         </VStack>
        




        </>

    );
  };
  
  export default DocList;