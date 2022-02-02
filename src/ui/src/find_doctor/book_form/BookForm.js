import React, { useState, useEffect, useContext, useMemo } from 'react';
import {
    Box,
    Link,
    FormControl,
    Input,
    Button,
    Flex,
    Text,
    FormLabel,
    VStack
  } from '@chakra-ui/react';
  import $ from 'jquery';
  import { MapContext } from '../../contexts/MapContext'
  import { UserContext } from '../../contexts/UserContext'
  import dayjs from 'dayjs'
  import { RendezvousContext } from '../../contexts/RendezvousContext';
  import { DateContext } from '../../contexts/DateContext';
import BookFormHeader from './BookFormHeader';
import BookFormRendList from './BookFormRendList';


const DocList = (values, isLogged) => {



    const { selectedDoctor, setIsBooking } = useContext(MapContext)
    const { userInfo } = useContext(UserContext)


    const { rendezvouDet, setRendezvouDet} = useState({
      user_id: userInfo.user_id,
      user_info: '',
      doctor_id: selectedDoctor.doctor_id,
      date_time: ''
    })
    const [ selectedDate, setSelectedDate ] = useState(dayjs())
    const [ selectedRendezvous, setSelectedRendezvous ] = useState({})
    const [ allRendezvous, setAllRendezvous ] = useState([])
    const [ isNext, setIsNext ] = useState(false)

    const rendezvous = useMemo(() => ({ allRendezvous, setAllRendezvous, selectedRendezvous, setSelectedRendezvous }), 
    [ allRendezvous, setAllRendezvous, selectedRendezvous, setSelectedRendezvous ]);

    const date = useMemo(() => ({ selectedDate, setSelectedDate, }), 
    [ selectedDate, setSelectedDate ]);

    const handleChange = e => {
      const { name, value } = e.target;
      setSelectedRendezvous({
        ...selectedRendezvous,
        [name]: value
      });
      console.log(selectedRendezvous);
    };


    useEffect(() => {
      setSelectedRendezvous({})
    }, [selectedDoctor, selectedDate]);
    

    const handleCancel = () => {
      setIsBooking(false)
    }

    const getOpenSlots = e => {

      console.log(e.target.value);

      var urlEnd = 'http://localhost:8080/WebApplication1/GetOpenSlots';
      var det = JSON.stringify(rendezvouDet);

      $.ajax({
        url: urlEnd,
        type: "POST",
        contentType: 'json',
        data: det,
        success: function (result) {
          console.log("SUCCESS")
          console.log(result)
          setAllRendezvous(result);
        },
        error: function (result) {
          console.log("FAIL")
        }
    });
    }

    const handleSubmit = e => {


      var urlEnd = 'http://localhost:8080/WebApplication1/BookAppointment';
      var dets = JSON.stringify(selectedRendezvous);

      $.ajax({
        url: urlEnd,
        type: "POST",
        contentType: 'json',
        data: dets,
        success: function (result) {
          console.log("SUCCESS")
        },
        error: function (result) {
          console.log("FAIL");
        }
    });


    }  


    const handleNext = () =>{
      setSelectedRendezvous({
        ...selectedRendezvous,
        date_time: dayjs(selectedRendezvous.date_time).subtract(4, 'day').format('YYYY-MM-DD')
      })
      setIsNext(true)
    }
  
    return (
        <DateContext.Provider value= { date }>
        <RendezvousContext.Provider value= { rendezvous }>

{!isNext ?
          <Flex h='100%' w='100%' flexDirection='column' justifyContent='space-between'>
            <VStack>
          <Link color='teal.500' onClick={handleCancel} w='100%' fontSize='md' textAlign='start' h='50px' >
              {'<'} Cancel booking
          </Link>
          <BookFormHeader/>

          <BookFormRendList/>
          </VStack>

          { Object.entries(selectedRendezvous).length === 0 ?
          <Button isDisabled >Next</Button>
          :
          <Button  onClick={handleNext}>Next</Button>
          }


          </Flex>
          :
          <Flex h='100%' w='100%' flexDirection='column' justifyContent='space-between'>
            <VStack>
          <Link color='teal.500' onClick={handleCancel} w='100%' textAlign='start' fontSize='md' h='50px' >
              {'<'} Cancel booking
          </Link>
          <FormControl  id= "doctor_info" >
                    <FormLabel>Doctor note</FormLabel>
                    <Input 
                        type= "text" 
                        name= "doctor_info"
                        isReadOnly
                        autoComplete= "on"
                        value= {selectedRendezvous.doctor_info}
                        onChange= {handleChange} 
                        />
                </FormControl>
          <FormControl  id= "user_info" >
                    <FormLabel>Patient info</FormLabel>
                    <Input 
                        type= "text" 
                        name= "user_info"
                        autoComplete= "on"
                        value= {selectedRendezvous.user_info}
                        onChange= {handleChange} 
                        placeholder= "Leave a note"
                        />
                </FormControl>

          </VStack>

          <Button onClick={handleSubmit} colorScheme='teal'>Submit</Button>
          </Flex>
}

        </RendezvousContext.Provider>
        </DateContext.Provider>

    );
  };
  
  export default DocList;