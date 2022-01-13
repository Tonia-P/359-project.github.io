import React, { useContext, useEffect } from 'react';
import{
    Button,
    Flex,
    Avatar,
    Text,
    Box,
    VStack,
    useColorModeValue
}from'@chakra-ui/react'

import { DateContext } from '../../../contexts/DateContext';
import { RendezvousContext } from '../../../contexts/RendezvousContext';

const AgendaSlot = ({ timeslot, rend }) => {

    const { setSelectingDate, setSelectedDate } = useContext(DateContext);
    const { setSelectedRendezvous } = useContext(RendezvousContext);
    const emptyColor = useColorModeValue('gray.200', 'gray.600')
    const selectedColor = useColorModeValue('purple.500', 'purple.300')
    const freeColor = useColorModeValue('blue.500', 'blue.300')

    const handleClick = () =>{
        setSelectingDate(timeslot.time);
        setSelectedDate(timeslot.time);
        if(timeslot.rend){
            setSelectedRendezvous(timeslot.rend)
        }
        else{
            setSelectedRendezvous({
                status: 'empty',
                user_id: '',
                date_time: timeslot.time,
                price: ''
            })
        }
    }


    return(
        <Button 
            w='100%' 
            justifyContent='start' 
            background='transparent' 
            p={1} 
            h='60px' 
            border='1px' 
            borderColor='transparent' 
            my={1}
            borderRadius={4}
            onClick={handleClick}
        >

            <Flex justifyItems='start' h='45px' alignItems='center' >
                <Text fontSize='lg' w='60px' h='50px' pr={4} display='flex' alignItems='center' fontWeight='bold'> {timeslot && timeslot.time.format('HH:mm')} </Text>

                <Box
                    w='6px' 
                    h='47px' 
                    mr={3}
                    background={
                        (timeslot.rend && timeslot.rend.status === 'selected' && selectedColor) ||
                        (timeslot.rend && timeslot.rend.status === 'free' && freeColor) ||
                        (!timeslot.rend  && emptyColor)
                    } 
                    borderRadius='10px'
                />

                {timeslot.rend && timeslot.rend.status !== 'free' && <Avatar name='Kola Tioluwani'  size='sm' src='https://bit.ly/tioluwani-kolawole' />}


                    <Text fontSize='md'  pl={2} fontWeight='bold' >
                        {timeslot.rend ? timeslot.rend.status : "+Add slot"}
                    </Text>

            </Flex>

        </Button>
    )
}


export default AgendaSlot;
