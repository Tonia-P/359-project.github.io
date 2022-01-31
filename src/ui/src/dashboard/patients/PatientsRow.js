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
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogContent,
    AlertDialogHeader,
    useColorModeValue
} from '@chakra-ui/react'
import { useState, useEffect, useContext } from 'react';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import $ from 'jquery';
import { TiDelete } from "react-icons/ti";
import dayjs from 'dayjs';



const PatientsRow = ({ patient }) =>{

    const [ isHovered, setIsHovered ] = useState(false);



    return(

        <>
        <Box
            onMouseEnter={() => {
                setIsHovered(true)
            }}
            onMouseLeave={() => {
                setIsHovered(false)
            }}
            m={4}
        >

            <Flex justifyContent='space-between' alignItems='center'>
                <HStack>
                    <Avatar name={patient.firstname + ' ' + patient.lastname} size='sm' src='https://bit.ly/broken-link' />
                    <Link to={`/patient/${patient.user_id}`} ><Text fontSize='md' isTruncated fontWeight="bold">{ patient.firstname + ' ' + patient.lastname }</Text></Link>
                </HStack>
            </Flex>

        </Box>



</>

    )
}


export default PatientsRow;