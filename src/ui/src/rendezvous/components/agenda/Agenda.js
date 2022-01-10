import React, { useState, useEffect, useContext } from 'react';
import{
    Box,
    Heading,
}from'@chakra-ui/react'

import AgendaSlot from './AgendaSlot';
import { DateContext  } from '../../../contexts/DateContext';
import { RendezvousContext  } from '../../../contexts/RendezvousContext';
import dayjs from 'dayjs';

const Agenda = () => {

     
    const { selectedDate,  selectedTime, setSelectedTime } = useContext(DateContext);
    const [ allRendezvous, setAllRendezvous ] = useState([
        {
            status: 'free',
            user_id: '0',
            date_time: dayjs('2022-01-12 11:00:00', 'YYYY-MM-DD HH:mm:ss'),
            price: '50'
        },
        {
            status: 'selected',
            user_id: '0',
            date_time: dayjs('2022-01-12 15:00:00', 'YYYY-MM-DD HH:mm:ss'),
            price: '50'
        },
        {
            status: 'selected',
            user_id: '0',
            date_time: dayjs('2022-01-12 16:00:00', 'YYYY-MM-DD HH:mm:ss'),
            price: '50'
        },
    ])

    const [ allTimeslots, setAllTimeslots ] = useState([]);
    const mememe = selectedDate.startOf('day');



    useEffect(() => {
        setAllTimeslots(createTimeslots());
        
    }, [selectedDate])
 
    const createTimeslots = () => {
        


        var tmp = mememe.hour(8);
        
        var i = 0;

        while( i !== 26 ){
            var tmpp = [...tmpp, tmp];
            tmp = tmp.add(30, 'minute');
            i++;

        }
        return tmpp;

    }


    const getRend = (i) =>{
        if(allRendezvous[0].date_time.format('HH:mm') === allTimeslots[i].format('HH:mm')){
            var tmp = allRendezvous[0];
            allRendezvous.shift();
            return tmp;
        } 
        else return null;
    }

     
    return(

        <>
        <Box  p={3} borderColor='gray.500' overflow='scroll' h='100%' >
            <Heading textAlign='start' py={2} mb={5} size='lg'>Agenda</Heading>


                { allTimeslots.map(timeslot =><>{ allTimeslots.indexOf(timeslot) !=0 && <AgendaSlot timeslot={ timeslot } 
                                                                                                    rend={getRend(allTimeslots.indexOf(timeslot))}  
                                                                                                    key={timeslot} />} </> )}

            <Box h='40px'></Box>
        </Box>
        
        </>
    )
}


export default Agenda;
