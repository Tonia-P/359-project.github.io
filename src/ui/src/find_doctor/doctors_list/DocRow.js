import React, { useEffect } from 'react';
import {
    Box,
    Text,
    Button,
    Avatar,
    Divider
  } from '@chakra-ui/react';


const DocRow = (values) => {

    useEffect(
        () => {
          console.log(values)
        },
        []
      );

  
    return (
      <Box minW="220px" borderWidth='2px' borderRadius='lg' overflow='hidden' minH="270px">
          <Box p='6'>
            <Avatar name={values.values.firstname+ " " + values.values.lastname} size='lg' src='https://bit.ly/broken-link' />
          </Box>
  
        <Box p='0' >
          <Box
            mt='1'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            isTruncated
          >
            {values.values.firstname} {values.values.lastname}
          </Box>
  
          <Text fontSize='sm'>General Doctor</Text>
          <Divider orientation='horizontal' height="10px"/>
  
          <Box display='flex' mt='2' alignItems='center'>
            <Box as='span' ml='2' fontSize='sm'>
              Hospital: {values.values.address}, 
              {values.values.city}, {values.values.country}
            </Box>
          </Box>
          <Divider orientation='horizontal' height="10px"/>
        <Box display='flex' mt='2' alignItems='center'>
            <Box as='span' ml='2' fontSize='sm'>
              {values.values.doctor_info}
            </Box>
          </Box>
        </Box>

        

        <Divider orientation='horizontal' height="10px"/>

        <Button margin="20px">
                View Profile
            </Button>
      </Box>
    )
  };
  
  export default DocRow;