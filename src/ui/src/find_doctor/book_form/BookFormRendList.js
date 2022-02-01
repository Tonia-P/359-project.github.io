import React, { useState, useEffect, useContext } from 'react';
import{
    Box,
    Heading,
    Button,
}from'@chakra-ui/react'

import { DateContext  } from '../../contexts/DateContext';
import { RendezvousContext  } from '../../contexts/RendezvousContext';
import { UserContext } from '../../contexts/UserContext';
import { MapContext } from '../../contexts/MapContext';
import dayjs from 'dayjs';
import $ from 'jquery'
import BookFormRendRow from './BookFormRow';

const BookFormRendList = () => {

     
    const { selectedDate } = useContext(DateContext);
    const { allRendezvous, setAllRendezvous } = useContext(RendezvousContext)
    const { selectedDoctor, setIsBooking } = useContext(MapContext)
    const { userInfo } = useContext(UserContext)

    const [ allTimeslots, setAllTimeslots ] = useState([]);
    const mememe = selectedDate.startOf('day');
    const [ rendezvouDet, setRendezvouDet ] = useState({
        user_id: userInfo.user_id,
        user_info: '',
        doctor_id: selectedDoctor.doctor_id,
        date_time: selectedDate.format('YYYY-MM-DD')
    })


    

    useEffect(() => {
        console.log(rendezvouDet);

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
          var json = JSON.parse(result)
          setAllRendezvous(json);
        },
        error: function (result) {
          console.log("FAIL")
        }
    });
    

    }, [rendezvouDet]);


    useEffect(() => {
    
        setRendezvouDet({
            ...rendezvouDet,
            doctor_id: selectedDoctor.doctor_id,
            date_time: selectedDate.format('YYYY-MM-DD')
        })

    }, [selectedDate, selectedDoctor]);



    return(

        <>
        <Box  p={3}  w='100%' h='100%' >

            {allRendezvous && allRendezvous.map(rend =>
            <BookFormRendRow key={rend.date_time} rend={rend}/>
                    )
                }
        </Box>
        
        </>
    )
}


export default BookFormRendList;
