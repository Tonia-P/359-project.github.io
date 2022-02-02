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
  
const DashboardUser = () => {

  const { userInfo } = useContext(UserContext);


    return (
        <Box w='85%' h='90%'>
            <Flex mt={3}>
                <VStack>
                    <Text fontSize='md'>Hello, {userInfo.firstname + ' ' + userInfo.lastname} </Text>
                    <Heading p={0} m={0} fontSize='2xl'>Welcome back</Heading>
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
                <Link to={`/newBloodTest/${userInfo.amka}`}>
                    <Button background='green.400' colorScheme='green' p={[3,3,3,3,5]} h='85%' w='100%' overflow='hidden'>
                        
                        <Icon as={GiBookCover} position='absolute' color='green.200' h={[100,100,100,100,200]} w={[100,100,100,100,200]} left='60%' top='50%' zIndex='1' />

                        <VStack h='100%' w='100%' textAlign='start' display='flex' alignItems='flex-start' zIndex='2'>
                        <Heading fontSize={['lg', 'lg', 'lg', 'lg', '3xl']} color='white'> New blood test </Heading>
                        <Text fontSize={['sm', 'sm', 'sm', 'sm', 'lg']} color='white'> Submit new <br/> blood test <br/> results. </Text>
                        </VStack>
                    </Button>
                    </Link>

                </GridItem>

                <GridItem rowSpan={3} colSpan={3} >
                <Link to="/find_doctor">
                    <Button background='cyan.400' colorScheme='cyan' p={[3,3,3,3,5]} h='85%' w='100%' overflow='hidden'>
                        
                        <Icon as={BsFillPersonLinesFill} position='absolute' color='cyan.200' h={[100,100,100,100,150]} w={[100,100,100,100,150]} left='60%' top='40%' zIndex='1' />

                        <VStack h='100%' w='100%' textAlign='start' display='flex' alignItems='flex-start' zIndex='2'>
                        <Heading fontSize={['lg', 'lg', 'lg', 'lg', '3xl']} color='white'> Doctors </Heading>
                        <Text fontSize={['sm', 'sm', 'sm', 'sm', 'lg']} color='white'> Find a doctor <br/> near you. </Text>
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


            <Box h='40px'/>
        </Box>
    );
};
  
  export default DashboardUser;