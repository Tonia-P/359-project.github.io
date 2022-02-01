import React, { useState, useEffect, useContext } from 'react';
import {
    Box,
    Link,
    FormControl,
    Input,
    Button,
    form,
    VStack
  } from '@chakra-ui/react';
  import $ from 'jquery';
  import { MapContext } from '../../contexts/MapContext'
  import { UserContext } from '../../contexts/UserContext'
  import dayjs from 'dayjs'


const DocList = (values, isLogged) => {

  const [responseMessage, setResponseMessage] = useState('');

  const [color, setColor] = useState('')

  const [flag, setFlag] = useState(false);
  const [temp, setTemp] = useState('');

    const { selectedDoctor, setIsBooking } = useContext(MapContext)
    const selectedUser = useContext(UserContext)
    const [dateVals, setDateVals] = useState({
      doctor_id: selectedDoctor.doctor_id,
      date_time: '',
      temp: 0
    })
    const { rendezvouDet, setRendezvouDet} = useState({
      user_id: selectedUser.user_id,
      user_info: '',
      doctor_id: selectedDoctor.doctor_id,
      date_time: ''
    })
    const [openSlots, setOpenSlots] = useState([]);


    const handleChange = e => {
      const { name, value } = e.target;
      setRendezvouDet({
        ...rendezvouDet,
        [name]: value
      });
      console.log(rendezvouDet);
    };

    const handleCancel = () => {
      setIsBooking(false)
    }

    const getOpenSlots = e => {

      console.log(e.target.value);

      const { name, value } = e.target;
      setDateVals({
        ...dateVals,
        [name]: value
      });
      console.log(dateVals);

      setDateVals({
        temp: 1
      });
      console.log(dateVals);

      var urlEnd = 'http://localhost:8080/WebApplication1/GetOpenSlots';
      var det = JSON.stringify(dateVals);

      $.ajax({
        url: urlEnd,
        type: "POST",
        contentType: 'json',
        data: det,
        success: function (result) {
          console.log("SUCCESS")
          setOpenSlots(result);
          setFlag(true)
          setResponseMessage('');
        },
        error: function (result) {
          console.log("FAIL")
          setFlag(false);
          setColor('red');
          setResponseMessage("There aren't any open slots for the slected date. </t>Please select another date.");
        }
    });
    }

    const handleSubmit = e => {

      e.preventDefault();
      var urlEnd = 'http://localhost:8080/WebApplication1/bookAppointment';
      var dets = JSON.stringify(rendezvouDet);

      $.ajax({
        url: urlEnd,
        type: "POST",
        contentType: 'json',
        data: dets,
        success: function (result) {
          console.log("SUCCESS")
          setColor('green')
          setResponseMessage('The appointment was </t> booked successfully');
        },
        error: function (result) {
          console.log("FAIL");
          setColor('red');
          setResponseMessage('Something went wrong while we were booking your appointment.');
        }
    });


    }  

  
    return (

        <>


<Link color='teal.500' onClick={handleCancel} href='#' w='100%' textAlign='start' h='50px' >
    {'<'} Cancel booking
  </Link>
  { flag && <form method= "POST" onSubmit={handleSubmit} noValidate>
        <VStack  spacing='0px' overflow-y='scroll'>
            { selectedDoctor.username}
            <Box h='100px'></Box>
            <FormControl isRequired id= "birthdate">
                <Input 
                    type= "date" 
                    name= "date_time"
                    autoComplete= "on"
                    min={dayjs().format('YYYY-MM-DD')}
                    value= {dateVals.date_time}
                    placeholder= {dayjs().format('YYYY-MM-DD')}
                    minLength="3"
                    maxLength= "30"
                    onChange={getOpenSlots}
                    />
            </FormControl>
            <FormControl isRequired id="openSlots">
            <select name="date_time">
                {openSlots.map(slot => <option key={slot.randevouz_id} value={slot.randevouz_id}>{slot.date_time}</option>)}
              
              </select>
            </FormControl>
            <FormControl isRequired id= "user_info">
                <Input 
                    type= "text" 
                    name= "user_info"
                    autoComplete= "on"
                    placeholder= "Write something you want to let the doctor know beforehand."
                    onChange={handleChange}
                    />
            </FormControl>
            
                <Button
                mt={2}
                colorScheme="teal"
                type="submit"
                isDisabled>
                  Submit
                  </Button>
                  <h2 style={{color: color}}>{responseMessage}</h2>
         </VStack>
         </form>

    }
    {!flag && <form method= "POST" onSubmit={handleSubmit} noValidate>
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
                    onChange={getOpenSlots}
                    />
            </FormControl>
            <FormControl isRequired id= "user_info">
                <Input 
                    type= "text" 
                    name= "user_info"
                    autoComplete= "on"
                    placeholder= "Write something you want to let the doctor know beforehand."
                    onChange={handleChange}
                    />
            </FormControl>
            
                <Button
                mt={2}
                colorScheme="teal"
                type="submit"
                isDisabled>
                  Submit
                  </Button>
                  <h2 style={{color: color}}>{responseMessage}</h2>
         </VStack>
         </form>

    }

        </>

    );
  };
  
  export default DocList;