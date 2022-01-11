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
    const { allRendezvous } = useContext(RendezvousContext);

    useEffect(() => {
    }, [])

    const handleClick = () =>{
        setSelectingDate(timeslot);
        setSelectedDate(timeslot);
    }



    return(
dayjs.isDayjs(selectedDate) ?
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
                <Text fontSize='lg' w='60px' pr={1} fontWeight='bold' borderRight='2px'> {timeslot && timeslot.format('HH:mm')} </Text>
                <Avatar name='Kola Tioluwani' ml={2} size='xs' src='https://bit.ly/tioluwani-kolawole' />
                <Text fontSize='lg'  pl={2} fontWeight='bold' >Kappa Lamda</Text>
            </Flex>
                

        </Button>
        :
        <>kkkk</>
      
    )
}


export default AgendaSlot;
