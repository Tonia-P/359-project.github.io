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
import RendezvousRows from './RendezvousRow';
  
const Rendezvous = () => {

  const { userInfo } = useContext(UserContext);
  const [ AllRendezvous, setAllRendezvous] = useState([]);

  const getRendevous = () => {
    const RandVals = {
        doctor_id: userInfo.doctor_id,
        date_time: dayjs().format('YYYY-MM-DD')
    } 

    console.log('in getRends - rendVals')
    console.log(RandVals);

    var dets = JSON.stringify(RandVals);
    var returnee = [];

    var urlEnd = 'http://localhost:8080/WebApplication1/AllRendevous'
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


            returnee = dontGetFormattedRends(json)
            console.log(returnee)
            setAllRendezvous(returnee);
          
        },
        error: function (result) {
          console.log("Fail");
        }
    });

}


useEffect(() => {
  getRendevous();

  

}, []);



const dontGetFormattedRends = (array) => {
  if (array.length === 0) return [];
  var newArray= []
  for (let r of array){
      newArray =[
          ...newArray,
          {
          date_time: dayjs(r.date_time),
          status: r.status,
          randevouz_id: r.randevouz_id,
          price: r.price,
          doctor_info: r.doctor_info,
          user_id: r.user_id,
          user_info:r.user_info
      }
  ]
  }
  //console.log('In dont format - new array: ')
  //console.log(newArray)
  return newArray;
  
}




    return (

        <Box background='gray.700' h='100%' borderRadius='5'  overflow='hidden'>
            
            {AllRendezvous.map(rend => <RendezvousRows key={rend.date_time} rend={rend}/>)}
        </Box>
   

    );
};
  
  export default Rendezvous;