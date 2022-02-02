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
  import { UserContext } from '../../contexts/UserContext';
import DocFilter from './DocFilter';



const DocList = () => {




    const { filteredDoctors, allDoctors } = useContext(MapContext)
    const { isLogged } = useContext(UserContext)

  
    return (

        <>


        <Box background='transparent' backdropBlur={4} zIndex='2' w='100%' h='60px' display='flex' alignItems='center' justifyContent='center'>
          <Text >All doctors</Text>
        </Box>

        {isLogged && <DocFilter/>}

       
        <VStack  spacing='0px' overflow-y='scroll'>
            {isLogged ? 
            filteredDoctors.map(doctor => <DocRow doctor={doctor} key={doctor.doctor_id} />)
            : 
            allDoctors.map(doctor => <DocRow doctor={doctor} key={doctor.doctor_id} />)
            }
            <Box h='100px'></Box>
         </VStack>
        




        </>

    );
  };
  
  export default DocList;