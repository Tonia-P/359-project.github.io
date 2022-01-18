import React, { useState, useEffect, useContext } from 'react';
import{
    Box,
    Heading,
    Text,
    Icon,
    Divider,
    Button,
    HStack,
    Textarea,
    Input,
    InputGroup,
    InputLeftElement,
    Flex,
    VStack
}from'@chakra-ui/react'

import { DateContext  } from '../../../contexts/DateContext';
import { RendezvousContext  } from '../../../contexts/RendezvousContext';
import { UserContext  } from '../../../contexts/UserContext';
import dayjs from 'dayjs';
import { BsCalendar, BsFillClockFill } from "react-icons/bs";
import $ from 'jquery';

const RendForm = () => {

     
    const { selectedDate } = useContext(DateContext);
    const { selectedRendezvous } = useContext(RendezvousContext)
    const { userInfo } = useContext(UserContext)
    const [ isAdd, setIsAdd ] = useState(false)
    const [ isFuture, setIsFuture ] = useState(false)
    const[ price, setPrice] = useState({
        value: 0
    });
    const[info, setInfo] = useState({
        text: ""
    });

    const addSlot = () => {
        const vals = {
            doctor_id: userInfo.doctor_id,
            user_id: "-1",
            date_time: selectedDate.format("YYYY-MM-DD HH:mm:ss"),
            price: price,
            doctor_info: info,
            user_info: "-2",
            status: selectedRendezvous.status
        }
        var json_vl = JSON.stringify(vals);

        var urlEnd = 'http://localhost:8080/WebApplication1/AddSlot';
        $.ajax({
            url: urlEnd,
            type: "POST",
            contentType: 'application/json',
            data: json_vl,
            success: function (result) {
                const json = JSON.parse(result)
                console.log(json);
                console.log("SUCCESS")
                
            },
            error: function (result) {
                console.log("FAIL")
            }
        });
    }





    var relativeTime = require('dayjs/plugin/relativeTime')
    dayjs.extend(relativeTime)
    var fromNow = selectedDate.fromNow()


    useEffect(() => {
        
        fromNow= selectedDate.fromNow()
        
    }, [selectedDate])

    useEffect(() =>{
        if(selectedRendezvous.status === 'empty') setIsAdd(true)
        else setIsAdd(false)


        if(dayjs().isBefore(selectedDate)) setIsFuture(true)

    }, [selectedRendezvous])

    useEffect(() =>{

        if(dayjs().isBefore(selectedDate)) setIsFuture(true)
        else setIsFuture(false)

    }, [selectedDate])




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


        { isAdd ?  isFuture && <>
                        <HStack my={2} mt={4} display='flex' alignItems='baseline'>
                            <Text fontSize='lg'>Add note </Text>
                        </HStack>

                        <Input
                            size='sm'
                            type='text'
                            resize='none'
                            onChange={e => setInfo(e.target.value)}
                        />

                        <HStack my={2} mt={4} display='flex' alignItems='baseline'>
                            <Text fontSize='lg'>Price </Text>
                        </HStack>

                        <InputGroup my={3}>
                            <InputLeftElement
                              pointerEvents='none'
                              color='gray.300'
                              fontSize='1.2em'
                              children='$'
                            />
                            <Input  placeholder='Enter price' onChange={e => setPrice(e.target.value)} />
                        </InputGroup>
                    </>

:

                    <>
                        <VStack my={2} display='flex' alignItems='baseline'>
                            <Text fontSize='lg'>Patient notes: </Text>
                            { selectedRendezvous.user_info ? 
                                <Text p={3} background='gray.700' w='100%' textAlign='start' fontSize='sm'>{selectedRendezvous.user_info }</Text>
                            :
                                <Text p={3} background='gray.700' w='100%' textAlign='start' fontSize='sm'>No note left from the patient</Text>
                            }
                        
                            <Text fontSize='lg'>Doctor notes: </Text>
                            <Text p={3} background='gray.700' w='100%' textAlign='start' fontSize='sm'>{selectedRendezvous.doctor_info }</Text>

                            <Text fontSize='lg'>Price </Text>
                            <Text p={3} background='gray.700' w='100%' textAlign='start' fontSize='sm'>{selectedRendezvous.price + ' $' }</Text>
                        </VStack>
                        
                        
                        
                        </>
        }           

        {isAdd && !isFuture &&  <Text mt={3}>Cannot add slots for past dates (unless you own a time machine)</Text>}
        {isAdd && isFuture  &&  <Button mt={3} onClick={addSlot}>Add slot</Button>}
        {!isAdd &&  
            <Flex justifyContent='center' w='100%'>
                <Button mt={3} mr={2} border='2px' background='transparent' borderColor='green.300' color='green.400'>Mark as done</Button>
                <Button mt={3} ml={2} border='2px' background='transparent' borderColor='red.300' color='red.400'>Cancel visit</Button>
            </Flex>
        }

        </Box>
        
        </>
    )
}


export default RendForm;
