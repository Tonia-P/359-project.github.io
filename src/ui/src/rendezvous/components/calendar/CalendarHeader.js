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
}from'@chakra-ui/react'
import { DateContext } from '../../../contexts/DateContext';

import $ from 'jquery';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


const CalendarHeader = () => {

    const handleBack = () =>{
        setSelectingDate(selectingDate.subtract(1, 'month'))
    }

    const handleForth = () =>{
        setSelectingDate(selectingDate.add(1, 'month'))
    }

     
    const { selectingDate, setSelectingDate } = useContext(DateContext);
    

    return(
<>
        <Flex w='100%' alignItems='center'>
        
        <Text fontSize='2xl' fontWeight="bold" colorScheme='teal'>
        {selectingDate.format('MMMM') + ", " + selectingDate.format('YYYY')}
        </Text>
        <Spacer/>


        <Icon as={IoIosArrowBack} w={6} h={6} mx={2} onClick={handleBack} _hover={{ color: 'grey' }} />
        <Icon as={IoIosArrowForward} mx={2}  w={6} h={6} onClick={handleForth} _hover={{ color: 'grey' }}/>

        </Flex>

        <Grid w='100%' templateColumns='repeat(7, 1fr)' my={4}>
        
            <GridItem><Text fontSize='xs' fontWeight="bold" color='gray.400'> Mon </Text></GridItem>
            <GridItem><Text fontSize='xs' fontWeight="bold" color='gray.400'> Tue </Text></GridItem>
            <GridItem><Text fontSize='xs' fontWeight="bold" color='gray.400'> Wed </Text></GridItem>
            <GridItem><Text fontSize='xs' fontWeight="bold" color='gray.400'> Thu </Text></GridItem>
            <GridItem><Text fontSize='xs' fontWeight="bold" color='gray.400'> Fri </Text></GridItem>
            <GridItem><Text fontSize='xs' fontWeight="bold" color='gray.400'> Sat </Text></GridItem>
            <GridItem><Text fontSize='xs' fontWeight="bold" color='gray.400'> Sun </Text></GridItem>
            
        </Grid>

</>
    )
}


export default CalendarHeader;
