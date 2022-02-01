import React, { useState, useEffect, useContext } from 'react';
import{
    Box,
    Heading,
    Flex,
    Text,
    Button,
}from'@chakra-ui/react'

import { DateContext  } from '../../contexts/DateContext';
import { RendezvousContext  } from '../../contexts/RendezvousContext';
import { UserContext } from '../../contexts/UserContext';
import { MapContext } from '../../contexts/MapContext';
import dayjs from 'dayjs';
import $ from 'jquery'

const BookFormRendRow = ({ rend }) => {

     
    const { selectedDate } = useContext(DateContext);
    const { selectedRendezvous, setSelectedRendezvous } = useContext(RendezvousContext)
    const { selectedDoctor, setIsBooking } = useContext(MapContext)
    const { userInfo } = useContext(UserContext)
    const [ isSelected, setIsSelected ] = useState(false);

    const [ allTimeslots, setAllTimeslots ] = useState([]);
    const mememe = selectedDate.startOf('day');
    const [ rendezvouDet, setRendezvouDet ] = useState({
        user_id: userInfo.user_id,
        user_info: '',
        doctor_id: selectedDoctor.doctor_id,
        date_time: selectedDate.format('YYYY-MM-DD')
    })

    const handleClick = () =>{
        setSelectedRendezvous(rend);
    }

    useEffect(() => {
        console.log(selectedRendezvous)
      if(selectedRendezvous === rend){
          setIsSelected(true)
      }
      else setIsSelected(false)
    }, [selectedRendezvous]);
    



    return(

        <Button w='100%' my={1} colorScheme={isSelected ? 'teal' : 'gray'} onClick={handleClick} border={isSelected && 'green'}>
            <Flex justifyContent='space-between' w='100%'>
                <Text>{ dayjs(rend.date_time).format('HH:mm') }</Text>
                <Text>{ rend.price + '$'}</Text>
            </Flex>
        </Button>
    )
}


export default BookFormRendRow;
