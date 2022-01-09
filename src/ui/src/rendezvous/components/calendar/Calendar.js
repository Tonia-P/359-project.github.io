import React, { useState, useEffect } from 'react';
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
import CalendarHeader from './CalendarHeader';
import CalendarDays from './CalendarDays';


const Calendar = () => {
     

    return(

        <>
        <Box w='300px' h='350px'  p={3} borderColor='gray.500'>
            <CalendarHeader />

            <CalendarDays/>

        </Box>
        
        </>
    )
}


export default Calendar;
