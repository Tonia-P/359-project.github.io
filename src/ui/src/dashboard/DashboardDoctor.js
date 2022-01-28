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
    VStack
  } from '@chakra-ui/react';
  import { UserContext } from '../contexts/UserContext';

  
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
                    <Button colorScheme='purple' h='85%' w='100%'>
                        Kappa
                    </Button>

                </GridItem>

                <GridItem rowSpan={3} colSpan={3} >
                    <Button colorScheme='blue' h='85%' w='100%'>
                        Kappa
                    </Button>
                </GridItem>

                <GridItem rowSpan={3} colSpan={3} >
                    <Button colorScheme='pink' h='85%' w='100%'>
                        Kappa
                    </Button>
                </GridItem>

                <GridItem rowSpan={5} colSpan={4} bg='darkblue' />

                <GridItem rowSpan={2} colSpan={9} bg='tomato' />
              
            </Grid>

            <Grid templateColumns='repeat(9, 1fr)' gap={6} mt={7}>
              <GridItem colSpan={4} h='300' bg='blue.500' />
              <GridItem colSpan={3} h='300' bg='blue.500' />
              <GridItem colSpan={2} h='300' bg='blue.500' />
            </Grid>

            <Box h='40px'/>
        </Box>
    );
};
  
  export default DashboardDoctor;