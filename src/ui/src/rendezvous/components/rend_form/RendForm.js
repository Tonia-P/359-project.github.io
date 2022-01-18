import React, { useState, useEffect, useContext } from 'react';
import{
    Box,
    Heading,
    Text,
    Icon,
    Divider,
    Button,
    HStack
}from'@chakra-ui/react'

import { DateContext  } from '../../../contexts/DateContext';
import { RendezvousContext  } from '../../../contexts/RendezvousContext';
import dayjs from 'dayjs';
import { BsCalendar, BsFillClockFill } from "react-icons/bs";

const RendForm = () => {

     
    const { selectedDate } = useContext(DateContext);
    const { allRendezvous} = useContext(RendezvousContext)

    const [ allTimeslots, setAllTimeslots ] = useState([]);
    const mememe = selectedDate.startOf('day');
    var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
var fromNow = selectedDate.fromNow()


    useEffect(() => {
        
        fromNow= selectedDate.fromNow()
        
    }, [selectedDate])


    return(

        <>
        <Box  p={3} borderColor='gray.500' overflow='scroll' h='100%' >
            <Heading textAlign='center' py={2} mb={5} size='md'>Add slot</Heading>

            <HStack my={2}>
                <Icon as={BsCalendar} />
                <Text>{selectedDate.format('dddd D, YYYY')}</Text>
            </HStack>


            <HStack my={2} display='flex' alignItems='baseline'>
                <Icon as={BsFillClockFill} />
                <Text>{selectedDate.format('HH:mm')}</Text>
                <Text fontSize='sm'>{'(' + fromNow + ')'}</Text>
            </HStack>

            <Divider/>
            <HStack my={2} display='flex' alignItems='baseline'>
                <Text>Status: </Text>
            </HStack>

            <HStack my={2} display='flex' alignItems='baseline'>
                <Text>Doctor notes: </Text>
            </HStack>


            <HStack my={2} display='flex' alignItems='baseline'>
                <Text>Patient notes: </Text>
            </HStack>

            <Button>Add slot</Button>

        </Box>
        
        </>
    )
}


export default RendForm;
