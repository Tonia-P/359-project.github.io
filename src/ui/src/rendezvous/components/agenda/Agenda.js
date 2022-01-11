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
        console.log("CHANGED")
        setAllTimeslots( createTimeslots());
        
        
        
    }, [selectedDate])


    useEffect(() =>{
        console.log(allTimeslots)
    }, [allTimeslots]
    )

 
    const createTimeslots = () => {
        


        var tmp = mememe.hour(8);
        
        var i = 0;
        var counter = 0;
        var tmpp = [];

        while( i !== 26 ){

            
            if(allRendezvous.length > counter && allRendezvous[counter].date_time.format('HH:mm') === tmp.format('HH:mm')) {
                console.log("if " + tmp.format('HH:mm'))
                tmpp = [
                    ...tmpp,
                    {
                        time: tmp,
                        rend: allRendezvous[counter]
                    }
                ]
                counter++;
                console.log(counter)

            }
            else{
                console.log("else")
                tmpp = [
                    ...tmpp,
                    {
                        time: tmp,
                        rend: null
                    }
                ]
            }
            tmp = tmp.add(30, 'minute');
            i++;

        }

        return tmpp;

    }


    return(

        <>
        <Box  p={3} borderColor='gray.500' overflow='scroll' h='100%' >
            <Heading textAlign='start' py={2} mb={5} size='lg'>Agenda</Heading>

            {allTimeslots && allTimeslots.map(timeslot => <>{ allTimeslots.indexOf(timeslot) !==0 && <AgendaSlot timeslot={timeslot} key={timeslot.time.format('HH:mm')} /> 
                    } </> )
                }
            <Box h='40px'></Box>
        </Box>
        
        </>
    )
}


export default Agenda;
