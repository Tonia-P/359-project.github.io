import React, { useState, useEffect, useContext } from 'react';
import {
    Text,
    SimpleGrid,
    Spinner
  } from '@chakra-ui/react';
  import DocRow from './DocRow';
  import $ from 'jquery';
  import { MapContext } from '../../contexts/MapContext'



const DocList = (values, isLogged) => {

    const [ doctors, setDoctors ] = useState([]);
    const [ isLoaded, setIsLoaded ] = useState(false);

    const { allDoctors } = useContext(MapContext)

  
    return (

        <>

        <Text>All doctors</Text>

       
        <SimpleGrid columns={[2, 3, 4]}  spacing='20px'>
            {allDoctors.map(doctor => <DocRow values={doctor} key={doctor.doctor_id} />)}
         </SimpleGrid>
        




        </>

    );
  };
  
  export default DocList;