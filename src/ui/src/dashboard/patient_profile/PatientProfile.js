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
    GridItem,
    Flex,
    Grid
  } from '@chakra-ui/react';
  import { UserContext } from '../../contexts/UserContext';
  import { NavigateFunction, useLocation, useNavigate, useParams } from "react-router";
  import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

  import dayjs from 'dayjs';
  import $ from 'jquery';
import Graph from '../../bloodtest/graph/Graph';
import TreatmentTable from './TreatmentTable';


  
const PatientsProfile = () => {

  const [ allPatients, setAllPatients ] = useState([])
  const { userInfo } = useContext(UserContext);
  const params = useParams();
  const [ patientInfo, setPatientInfo ] = useState({})


  useEffect(() => {
    const RandVals = {
      user_id: userInfo.doctor_id
  } 

  console.log(params)

  var dets = JSON.stringify(params);

  var urlEnd = 'http://localhost:8080/WebApplication1/GetUserFromId'
  $.ajax({
      url: urlEnd,
      type: "POST",
      contentType: 'application/json',
      data: dets,
      success: function (result) {
          console.log(result)
          //var json = JSON.parse(result)
          //setAllRendezvous(json)
          console.log("in request - json: ")
          //console.log(result)
          console.log("Success");


          setPatientInfo(result);
        
      },
      error: function (result) {
        console.log("Fail");
      }
  });
  }, []);


  useEffect(() => {
    console.log(patientInfo)
  }, [patientInfo]);
  
  



    return (

        <Grid
          w='100%'
          h='150vh'
          templateRows='repeat(2, 1fr)'
          templateColumns='repeat(5, 1fr)'
          gap={4}
        >
          <GridItem rowSpan={2} h= '100%' colSpan={2} bg='gray.900' >
              {patientInfo.amka}
              <Link to={`/newTreatment/${patientInfo.user_id}/${patientInfo.amka}`}>
                        <Button>Add new</Button>
                    </Link>
          </GridItem>
          <GridItem colSpan={3} h= '100%' display='flex' alignItems='center' justifyContent='center' >

              {patientInfo.amka  && <Graph amka={{amka: patientInfo.amka}} />}
          </GridItem>
          <GridItem colSpan={3} h= '100%' p={3} >
              <Flex justifyContent='space-between' zIndex='3'>
                    <Text>Treatments</Text>
                    {patientInfo.amka  &&
                    <Link to={`/newTreatment/${patientInfo.user_id}/${patientInfo.amka}`}>
                        <Button>Add new</Button>
                    </Link>
}
              </Flex>
              <TreatmentTable user_id={params} />
          </GridItem>
        </Grid>
   

    );
};
  
  export default PatientsProfile;