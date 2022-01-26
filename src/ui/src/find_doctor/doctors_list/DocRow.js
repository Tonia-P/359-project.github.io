import React, { useEffect, useContext } from 'react';
import {
    Box,
    Text,
    Button,
    Avatar,
    GridItem,
    Grid,
    Flex,
    Divider
  } from '@chakra-ui/react';
  import { MapContext } from '../../contexts/MapContext';


const DocRow = ({ doctor }) => {


  const { selectedDoctor, setSelectedDoctor } = useContext(MapContext)



  useEffect(() => {
    
  }, []);


  const handleClick = () =>{
    setSelectedDoctor(doctor);
  }
  
  
    return (
      <Button w='100%' onClick={handleClick} _hover={{background: 'gray.900'}} background='transparent' h='100px' minH='100px'>
         <Flex w='100%' alignItems='center'>
                    <Avatar mr={2} name={doctor.firstname + ' ' + doctor.lastname} size='md' src='https://bit.ly/broken-link'  />


                    <Grid templateRows='repeat(2, 1fr)' pl={2}>
                        <GridItem rowSpan={1} isTruncated>
                            <Flex w='100%' justifyContent='space-between' alignItems='baseline'>
                                <Text isTruncated>{doctor.lastname + " " + doctor.firstname}</Text>


                            </Flex>
                        </GridItem>

                        <GridItem rowSpan={1} mt={1} textAlign='start' isTruncated>
                            <Text fontSize='sm' fontWeight='300' isTruncated >{doctor.specialty}</Text>
                        </GridItem>
                    </Grid>
                    

            </Flex>
      </Button>
    )
  };
  
  export default DocRow;