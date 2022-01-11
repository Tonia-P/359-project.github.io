import React, { useState, useEffect, useContext } from 'react';
import{
    Editable,
    EditableInput, 
    EditablePreview,
    useEditableControls,
    ButtonGroup,
    IconButton,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
    Spinner,
    Flex,
    InputRightElement,
    InputGroup,
    Stack,
    Grid,
    InputLeftElement,
    GridItem,
    Box,
    Avatar,
    Text,
    VStack,
    Divider,
    Heading,
    useColorModeValue,
    Fade, ScaleFade, Slide, SlideFade,
    Collapse,
    Circle,
    useDisclosure,
    NumberDecrementStepper,
    LinkBox,
    LinkOverlay,
}from'@chakra-ui/react'
import dayjs from 'dayjs';

import $ from 'jquery';
import { DateContext } from '../../../contexts/DateContext';
import { RendezvousContext } from '../../../contexts/RendezvousContext';

const AgendaSlot = ({ timeslot, rend }) => {

    const { selectedDate, setSelectingDate, setSelectedDate } = useContext(DateContext);
    const { selectedRendezvous, setSelectedRendezvous } = useContext(RendezvousContext);

    useEffect(() => {
        if(timeslot.rend)
        console.log(timeslot.rend.date_time.format('YYYY/MM/DD') + " - " + timeslot.time.format('HH:mm'))
    }, [rend, timeslot])

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
            p={2} h='50px' 
            border='1px' 
            borderColor='gray.600' 
            my={1}
            borderRadius={4}
            onClick={handleClick}
        >

            <Flex justifyItems='start' h='40px' alignItems='center' >
                <Text fontSize='lg' w='60px' pr={1} fontWeight='bold' borderRight='2px'> {timeslot && timeslot.time.format('HH:mm')} </Text>

                <Avatar name='Kola Tioluwani' ml={2} size='xs' src='https://bit.ly/tioluwani-kolawole' />

                <Text fontSize='lg'  pl={2} fontWeight='bold' >
                {timeslot.rend ? timeslot.rend.status : "Add slot"}
                </Text>

            </Flex>

        </Button>
    )
}


export default AgendaSlot;
