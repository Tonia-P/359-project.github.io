import React, { useState, useEffect, useMemo } from 'react';
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
}from'@chakra-ui/react'

import $ from 'jquery';
import { FaUserCheck } from "react-icons/fa";
import Calendar from './components/calendar/Calendar';
import { DateContext } from '../contexts/DateContext';
import dayjs from 'dayjs'


const Rendezvous = ({number}) => {

    const gradient = useColorModeValue('box-light', 'box-dark')
    const letterColor = useColorModeValue('white', 'teal.200')
    const iconColor = useColorModeValue('white', '#2A4365')


    const [selectingDate, setSelectingDate] = useState(dayjs() );
    const [ selectedDate, setSelectedDate ] = useState(dayjs() );


    const date = useMemo(() => ({ selectingDate, setSelectingDate, selectedDate, setSelectedDate }), [ selectingDate, setSelectingDate, selectedDate, setSelectedDate ]);


    return(

        <>
        <DateContext.Provider value= { date }>

            <Calendar />

        </DateContext.Provider>
            
        

        </>
    )
}


export default Rendezvous;
