import React, { useState, useEffect, useContext } from 'react';
import{
    Box,
    Heading,
    Button,
}from'@chakra-ui/react'
import {AiFillFilePdf} from 'react-icons/ai';

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

        return tmpp;

    }


    

    useEffect(() => {
        console.log("Recreate timeslots.")
        setAllTimeslots(createTimeslots());
    

    }, [allRendezvous])



    return(

        <>
        <Box  p={3} borderColor='gray.500' overflow='scroll' h='100%' >
            <Heading textAlign='center' py={2} mb={5} size='md'>{selectedDate.format('dddd D, YYYY')}</Heading>
            <Button colorScheme='red'   leftIcon={<AiFillFilePdf />} size='sm' variant='outline'>PDF </Button>

            {allTimeslots && allTimeslots.map(timeslot => allTimeslots.indexOf(timeslot) !==0 && <AgendaSlot timeslot={timeslot} key={timeslot.time.format('HH:mm')} /> 
                    )
                }
            <Box h='40px'></Box>
        </Box>
        
        </>
    )
}


export default Agenda;
