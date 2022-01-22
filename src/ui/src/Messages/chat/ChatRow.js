import {
    Tr,
    Td,
    IconButton,
    Button,
    Grid,
    GridItem,
    Text,
    HStack,
    VStack,
    Flex,
    Box,
    Avatar,
    useColorModeValue
} from '@chakra-ui/react'
import { useState, useEffect, useContext } from 'react';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import $ from 'jquery';
import { TiDelete } from "react-icons/ti";
import { MessagesContext } from '../../contexts/MessagesContext';
import dayjs from 'dayjs';



const ChatRow = ({ message }) =>{


    const color = useColorModeValue('gray.100', 'gray.700')
    const deleteHover = useColorModeValue('red.500', 'red.400')
    const [ isLoaded, setIsLoaded ] = useState(false);
    const { setAllMessages } = useContext(MessagesContext);


    var relativeTime = require('dayjs/plugin/relativeTime')
    dayjs.extend(relativeTime)
    const betterTime = dayjs(message.date_time)

    return(
        <>

            <Box 
            h='75px'
            w='100%'
            background='gray.700'
            _hover={{background: 'gray.700'}}
            p={2}

        >

            
            <Flex w='100%' alignItems='center'>
                    <Avatar name={message.sender} size='sm' src='https://bit.ly/broken-link'  />


                    <Grid templateRows='repeat(2, 1fr)' pl={2} w='100%'>
                        <GridItem rowSpan={1} isTruncated>
                            <Flex w='100%' justifyContent='space-between' alignItems='baseline'>
                                <Text fontSize='md' isTruncated>{message.sender}</Text>

                                <Text fontSize='xs' fontWeight='100'>{betterTime && betterTime.fromNow()}</Text>

                            </Flex>
                        </GridItem>

                        <GridItem rowSpan={1} textAlign='start' mt={1} isTruncated>
                            <Text fontSize='sm' fontWeight='300' isTruncated >{message.message}</Text>
                        </GridItem>
                    </Grid>
                    

            </Flex>
        </Box>


        </>


    )
}


export default ChatRow;