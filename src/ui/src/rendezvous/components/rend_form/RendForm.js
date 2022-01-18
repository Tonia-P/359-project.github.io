import React, { useState, useEffect, useContext } from 'react';
import{
    Box,
    Heading,
    Text,
    Icon,
    Divider,
    Button,
    HStack,
    Textarea
}from'@chakra-ui/react'

import { DateContext  } from '../../../contexts/DateContext';
import { RendezvousContext  } from '../../../contexts/RendezvousContext';
import dayjs from 'dayjs';
import { BsCalendar, BsFillClockFill } from "react-icons/bs";

const RendForm = () => {

     
    const { selectedDate } = useContext(DateContext);
    const { selectedRendezvous } = useContext(RendezvousContext)
    const [ isAdd, setIsAdd ] = useState(false)



    var relativeTime = require('dayjs/plugin/relativeTime')
    dayjs.extend(relativeTime)
    var fromNow = selectedDate.fromNow()


    useEffect(() => {
        
        fromNow= selectedDate.fromNow()
        
    }, [selectedDate])

    useEffect(() =>{
        if(selectedRendezvous.status === 'empty') setIsAdd(true)
        else setIsAdd(false)
    }, [selectedRendezvous])


    return(

        <>
        <Box  p={3} borderColor='gray.500' overflow='scroll' h='100%' >
            <Heading textAlign='center' py={2} mb={5} size='md'>
                {isAdd ? 'Add slot' : 'Edit slot' } 
            </Heading>

            <HStack my={3}>
                <Icon as={BsCalendar} />
                <Text fontSize='lg'>{selectedDate.format('dddd D, YYYY')}</Text>
            </HStack>


            <HStack my={3} display='flex' alignItems='baseline'>
                <Icon as={BsFillClockFill} height='20px'/>
                <Text fontSize='lg'>{selectedDate.format('HH:mm')}</Text>
                <Text fontSize='xs'>{'(' + fromNow + ')'}</Text>
            </HStack>

            <Divider/>
            <HStack my={3} display='flex' alignItems='baseline'>
                <Text fontSize='lg'>Status: {selectedRendezvous.status} </Text>
            </HStack>

            <HStack my={2} mt={4} display='flex' alignItems='baseline'>
                <Text fontSize='lg'>Add note </Text>
            </HStack>

            <Textarea
                placeholder='Here is a sample placeholder'
                size='sm'
                resize='none'
            />


            <HStack my={2} display='flex' alignItems='baseline'>
                <Text fontSize='lg'>Patient notes: </Text>
            </HStack>

            <Button>Add slot</Button>

        </Box>
        
        </>
    )
}


export default RendForm;
