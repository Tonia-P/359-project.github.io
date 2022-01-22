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



const MessageRows = (info) =>{


    const color = useColorModeValue('gray.100', 'gray.700')
    const deleteHover = useColorModeValue('red.500', 'red.400')
    const [ isLoaded, setIsLoaded ] = useState(false);
    const { setAllMessages } = useContext(MessagesContext);


    var relativeTime = require('dayjs/plugin/relativeTime')
    dayjs.extend(relativeTime)
    const betterTime = dayjs(info.info.date_time)

    const getAllMessages = () => {

            const docVals = {
              doctor_id: info.info.doctor_id,
              username: info.info.sender
            }
            var urlEnd2 = 'http://localhost:8080/WebApplication1/AllMessages';
            var dets = JSON.stringify(docVals);
            $.ajax({
                url: urlEnd2,
                type: "POST",
                contentType: 'application/pdf',
                data: dets,
                success: function (result) {
                    console.log(info.info.sender);
                    console.log(info.info.doctor_id);
                    console.log("Success");
                    var json = JSON.parse(result);
                    console.log(result);
                    setAllMessages(json)

                    // <Link to="/allMessages"></Link>
                    //setIsLoaded(true);
                    
                },
                error: function (result) {

                    console.log(info.info.sender);
                    console.log(info.info.doctor_id);
                    console.log("Fail");
                    console.log(result)
    
                    //setIsLoaded(false);
                }
            });
        }



    return(
        <>

            <Button 
            h='75px'
            w='100%'
            background='gray.700'
            _hover={{background: 'gray.700'}}
            p={2}
            onClick={getAllMessages}

        >
            <Flex w='100%' alignItems='center'>
                    <Avatar name={info.info.sender} size='sm' src='https://bit.ly/broken-link'  />


                    <Grid templateRows='repeat(2, 1fr)' pl={2} w='100%'>
                        <GridItem rowSpan={1} isTruncated>
                            <Flex w='100%' justifyContent='space-between' alignItems='baseline'>
                                <Text isTruncated>{info.info.username}</Text>

                                <Text fontSize='xs' fontWeight='100'>{betterTime && betterTime.fromNow()}</Text>

                            </Flex>
                        </GridItem>

                        <GridItem rowSpan={1} textAlign='start' mt={1} isTruncated>
                            <Text fontSize='sm' fontWeight='300' isTruncated >{info.info.sender + ": " + info.info.message}</Text>
                        </GridItem>
                    </Grid>
                    

            </Flex>
        </Button>


        </>


    )
}


export default MessageRows;