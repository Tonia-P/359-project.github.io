import React, { useState, useEffect, useContext } from 'react';
import {
    Text,
    Spinner,
    Box,
    FormControl,
    FormLabel,
    Divider,
    Input,
    Button,
    Flex,
    Container,
    Grid,
    Heading,
    GridItem,
    Icon,
    VStack
  } from '@chakra-ui/react';
  import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
  import { UserContext } from '../contexts/UserContext';
  import { GiBookCover } from 'react-icons/gi';
  import { BsFillPersonLinesFill } from 'react-icons/bs';
  import { TiMessages } from 'react-icons/ti';
import Rendezvous from './rends/Rendezvous';
import PatientsTab from './patients/PatientsTab';
import BloodDonation from './blood_donation/BloodDonation';
  
const DashboardDoctor = () => {

  const { userInfo } = useContext(UserContext);


    return (
        <Box w='85%' h='90%'>
            <Flex mt={3}>
                <VStack>
                    <Text fontSize='md'>Hello, dr {userInfo.firstname + ' ' + userInfo.lastname} </Text>
                    <Heading p={0} fontSize='2xl'>Welcome back</Heading>
                </VStack>
            </Flex>

            
            <Grid
              h={[230, 200, 200, 250, 350]}
              w='100%'
              templateRows='repeat(5, 1fr)'
              templateColumns='repeat(13, 1fr)'
              gap={4}
              mt={5}
            >
              
                <GridItem rowSpan={3} colSpan={3} >
                <Link to="/rendezvous">
                    <Button background='purple.400' colorScheme='purple' p={[3,3,3,3,5]} h='85%' w='100%' overflow='hidden'>
                        
                        <Icon as={GiBookCover} position='absolute' color='purple.200' h={[100,100,100,100,200]} w={[100,100,100,100,200]} left='60%' top='50%' zIndex='1' />

                        <VStack h='100%' w='100%' textAlign='start' display='flex' alignItems='flex-start' zIndex='2'>
                        <Heading fontSize={['lg', 'lg', 'lg', 'lg', '3xl']} color='white'> Agenda </Heading>
                        <Text fontSize={['sm', 'sm', 'sm', 'sm', 'lg']} color='white'> Create, check or cancel <br/> rendezvous with <br/> patients. </Text>
                        </VStack>
                    </Button>
                    </Link>

                </GridItem>

                <GridItem rowSpan={3} colSpan={3} >
                <Link to="/rendezvous">
                    <Button background='blue.400' colorScheme='blue' p={[3,3,3,3,5]} h='85%' w='100%' overflow='hidden'>
                        
                        <Icon as={BsFillPersonLinesFill} position='absolute' color='blue.200' h={[100,100,100,100,150]} w={[100,100,100,100,150]} left='60%' top='40%' zIndex='1' />

                        <VStack h='100%' w='100%' textAlign='start' display='flex' alignItems='flex-start' zIndex='2'>
                        <Heading fontSize={['lg', 'lg', 'lg', 'lg', '3xl']} color='white'> Patients </Heading>
                        <Text fontSize={['sm', 'sm', 'sm', 'sm', 'lg']} color='white'> List of all your patients </Text>
                        </VStack>
                    </Button>
                    </Link>
                </GridItem>

                <GridItem rowSpan={3} colSpan={3} >
                <Link to="/messages">
                    <Button background='pink.400' colorScheme='pink' p={[3,3,3,3,5]} h='85%' w='100%' overflow='hidden'>
                        
                        <Icon as={TiMessages} position='absolute' color='pink.200' h={[100,100,100,100,150]} w={[100,100,100,100,150]} left='60%' top='40%' zIndex='1' />

                        <VStack h='100%' w='100%' textAlign='start' display='flex' alignItems='flex-start' zIndex='2'>
                        <Heading fontSize={['lg', 'lg', 'lg', 'lg', '3xl']} color='white'> Messages </Heading>
                        <Text fontSize={['sm', 'sm', 'sm', 'sm', 'lg']} color='white'> Check the latest messages </Text>
                        </VStack>
                    </Button>
                    </Link>
                </GridItem>

                <GridItem rowSpan={5} colSpan={4} bg='darkblue' />

                <GridItem rowSpan={2} colSpan={9} >
                    <BloodDonation/>
                    </GridItem>
              
            </Grid>

            <Grid templateColumns='repeat(9, 1fr)' gap={6} mt={7}>
                <GridItem colSpan={4} h='300' >
                    <Heading textAlign='start' fontSize='lg' color='gray.300' mb={2}>Appointments</Heading>
                    <Rendezvous/>
                </GridItem>
                <GridItem colSpan={3} h='300' >
                    <Heading textAlign='start' fontSize='lg' color='gray.300' mb={2}>Patients</Heading>
                    <PatientsTab/>
                </GridItem>
                <GridItem colSpan={2} h='300' >
                    <Heading textAlign='start' fontSize='lg' color='gray.300' mb={2}>Next patient</Heading>
                </GridItem>
            </Grid>

            <Box h='40px'/>
        </Box>
    );
};
  
  export default DashboardDoctor;