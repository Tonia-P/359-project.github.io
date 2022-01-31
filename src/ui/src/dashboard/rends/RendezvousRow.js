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
import { MessagesContext } from '../../contexts/MessagesContext';
import dayjs from 'dayjs';



const RendezvousRows = ({ rend }) =>{

    const [isOpen, setIsOpen] = React.useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef()

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
                    <Avatar name='Tonia Psom' size='sm' src='https://bit.ly/broken-link' />
                    <Link to={`/patient/${rend.user_id}`} ><Text fontSize='md' fontWeight="bold">{ rend.user_id }</Text></Link>
                </HStack>

                {isHovered ? <Button colorScheme='red' variant='outline' size='sm' onClick={() => setIsOpen(true)}>Cancel</Button> : <Text fontSize='md' fontWeight="bold">{rend.date_time.format('HH:mm')}</Text> }
            </Flex>

        </Box>






    <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
    >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Cancel Rendezvous
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                No
              </Button>
              <Button colorScheme='red' onClick={onClose} ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
    </AlertDialog>

</>

    )
}


export default RendezvousRows;