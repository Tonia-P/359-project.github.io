import React, { useState, useEffect, useContext, useMemo } from 'react';
import {
    Box,
    Link,
    FormControl,
    Input,
    Button,
    Flex,
    FormLabel,
    IconButton,
    Text,
    VStack
  } from '@chakra-ui/react';
  import $ from 'jquery';
  import { MapContext } from '../../contexts/MapContext'
  import { UserContext } from '../../contexts/UserContext'
  import dayjs from 'dayjs'
  import { RendezvousContext } from '../../contexts/RendezvousContext';
  import { DateContext } from '../../contexts/DateContext';
  import { ChevronLeftIcon, ChevronRightIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'


const BookFormHeader = () => {

    const { selectedDate, setSelectedDate } = useContext( DateContext )


    const handleBack = () =>{
        setSelectedDate(selectedDate.subtract(1, 'day'))
    }

    const handleForth = () =>{
        
        setSelectedDate(selectedDate.add(1, 'day'))
    }

  
    return (
        <Flex w='100%' justifyContent='space-between' alignItems='center'>
            {!dayjs().isSame(selectedDate, 'day') ? <IconButton aria-label='previous day' onClick={handleBack} icon={<ChevronLeftIcon />} /> : <IconButton aria-label='previous day' isDisabled icon={<ChevronLeftIcon />} />}
            <VStack>
                <Text> {selectedDate.format('MMMM D, YYYY')} </Text>
            </VStack>
            <IconButton aria-label='next day' onClick={handleForth} icon={<ChevronRightIcon />} />
        </Flex>
    );
  };
  
  export default BookFormHeader;