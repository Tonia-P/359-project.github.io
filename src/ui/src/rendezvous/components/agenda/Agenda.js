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

     
    const { selectedDate } = useContext(DateContext);
    const { allRendezvous} = useContext(RendezvousContext)

    const [ allTimeslots, setAllTimeslots ] = useState([]);
    const mememe = selectedDate.startOf('day');



 
    const createTimeslots = () => {
        
        var tmp = mememe.hour(8);

        console.log('In create timeslots - all rends: ')
        console.log(allRendezvous)
        
        var i = 0;
        var counter = 0;
        var tmpp = [];

        while( i !== 26 ){

            
            if(allRendezvous && allRendezvous.length > counter && allRendezvous[counter].date_time.format('HH:mm') === tmp.format('HH:mm')) {
                tmpp = [
                    ...tmpp,
                    {
                        time: tmp,
                        rend: allRendezvous[counter]
                    }
                ]
                counter++;

            }
            else{
                tmpp = [
                    ...tmpp,
                    {
                        time: tmp,
                        rend: {
                            status: 'empty'
                        }
                    }
                ]
            }
            tmp = tmp.add(30, 'minute');
            i++;

        }

        console.log(tmpp);

        return tmpp;

    }


    

    useEffect(() => {
        console.log("Recreate timeslots.")
        console.log(allRendezvous);
        setAllTimeslots(createTimeslots());
    

    }, [allRendezvous]);



    return(

        <>
        <Box  p={3} borderColor='gray.500' overflow='scroll' h='100%' >
            <Heading textAlign='start' py={2} mb={5} size='lg'>Agenda</Heading>

            {allTimeslots && allTimeslots.map(timeslot => allTimeslots.indexOf(timeslot) !==0 && <AgendaSlot timeslot={timeslot} key={timeslot.time.format('HH:mm')} /> 
                    )
                }
            <Box h='40px'></Box>
        </Box>
        
        </>
    )
}


export default Agenda;
