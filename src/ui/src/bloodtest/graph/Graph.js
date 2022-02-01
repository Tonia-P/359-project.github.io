import React, { useState, useEffect, useContext } from 'react';
import {
    Text,
    Spinner,
    Box,
    FormControl,
    FormLabel,
    Divider,
    Input,
    Button,
    Grid
  } from '@chakra-ui/react';
  import { UserContext } from '../../contexts/UserContext';

  import dayjs from 'dayjs';
  import $ from 'jquery';


  
const Graph = () => {

  const [ allPatients, setAllPatients ] = useState([])
  const { userInfo } = useContext(UserContext);


    return (

        <Box background='gray.700' h='400px' maxW='700px' minW='500px' borderRadius='5' overflow='hidden'>
            Chart here

        </Box>
   

    );
};
  
  export default Graph;