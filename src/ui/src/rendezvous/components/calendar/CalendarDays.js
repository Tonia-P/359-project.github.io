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
import CalendarTile from './CalendarTile';


const CalendarDays = () => {


     
    const { selectingDate, setSelectingDate } = useContext(DateContext);

    const startDate = selectingDate.startOf('month').startOf('week');
    const endDate = selectingDate.endOf('month').endOf('week');
    const [ allDays, setAllDays] = useState([]);

    useEffect(() => {
        setAllDays(getDays());
    }, [selectingDate])



    const getDays = () => {
        var tmp = startDate;
        var i = 0;

        while( i !== 42 ){
            var tmpp = [...tmpp, tmp];
            tmp = tmp.add(1, 'day');
            i++;

        }
        console.log(tmpp)
        return tmpp;
    }
    

    return(
        <Grid templateColumns='repeat(7, 1fr)' templateRows='repeat(6, 1fr)' w='100%'>

                {allDays.map(date => <>{ allDays.indexOf(date) !==0 && <GridItem><CalendarTile date={date} key={date} /></GridItem>  } </> )}
        </Grid>
    )
}


export default CalendarDays;
