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
  import PatientsRow from './PatientsRow'

  import dayjs from 'dayjs';
  import $ from 'jquery';


  
const PatientsTab = () => {

  const [ allPatients, setAllPatients ] = useState([])
  const { userInfo } = useContext(UserContext);



  useEffect(() => {
    const RandVals = {
      doctor_id: userInfo.doctor_id
  } 

  console.log('in getRends - rendVals')
  console.log(RandVals);

  var dets = JSON.stringify(RandVals);
  var returnee = [];

  var urlEnd = 'http://localhost:8080/WebApplication1/RendevousToUsers'
  $.ajax({
      url: urlEnd,
      type: "POST",
      contentType: 'application/json',
      data: dets,
      success: function (result) {
          var json = JSON.parse(result)
          //setAllRendezvous(json)
          console.log("in request - json: ")
          console.log(json)
          //console.log(result)
          console.log("Success");


          setAllPatients(json);
        
      },
      error: function (result) {
        console.log("Fail");
      }
  });
  }, []);
  



    return (

        <Box background='gray.700' h='100%' borderRadius='5' overflow='hidden'>
            
            {allPatients.map(patient => <PatientsRow key={patient.user_id} patient={patient} />)}

        </Box>
   

    );
};
  
  export default PatientsTab;