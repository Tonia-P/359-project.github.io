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
    Icon,
    Spacer,
    Link,
    LinkBox,
    HStack
}from'@chakra-ui/react'
import { DateContext } from '../../../contexts/DateContext';

import $ from 'jquery';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import dayjs from 'dayjs';


const CalendarTile = ({ date }) => {


     
    const { selectingDate, setSelectingDate, selectedDate, setSelectedDate } = useContext(DateContext);

    const handleClick = () =>{
        setSelectingDate(date);
        setSelectedDate(date);
    }

    const checkOffMonth = () => {

    }



    return(
        <Button 
            colorScheme={date.format('DD/MM/YYYY') === selectingDate.format('DD/MM/YYYY') || date.format('DD/MM/YYYY') === dayjs().format('DD/MM/YYYY') ? "teal" : 'gray'}
            variant={date.format('DD/MM/YYYY') === selectingDate.format('DD/MM/YYYY') ? "solid" : date.format('DD/MM/YYYY') === dayjs().format('DD/MM/YYYY') ? "outline" : 'ghost'}
            onClick={handleClick}
            h='35px'

        >
            <Flex 
                justifyContent='center' 
                position='absolute' 
                alignItems='flex-end' 
                h='40%' 
                w="100%"
                color = {date.format('MM') !== selectingDate.format('MM') && "gray.500" }
            >
            {date.format('DD')}
            </Flex>

            
            <Flex justifyContent='space-between' position='absolute' alignItems='flex-end' h='70%' w="40%">
            <Circle size='4px' bg='tomato' color='white'/>
            <Circle size='4px' bg='tomato' color='white'/>
            <Circle size='4px' bg='tomato' color='white'/>
            </Flex>
            
        </Button>
        
    )
}


export default CalendarTile;
