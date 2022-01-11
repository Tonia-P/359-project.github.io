import React from 'react';
import UpdateInput from '../../components/updatefields/UpdateInput';
import UpdateDisabled from '../../components/updatefields/UpdateDisabled';
import{
    Box,
    Text,
    VStack,
    useColorModeValue,
}from'@chakra-ui/react'

const PersonalInfo = () => {

    const color = useColorModeValue('white', 'gray.700')


    return(
        <Box borderWidth='1px' borderRadius='3px'  bg={color}>
          <Box bg='teal.400' h='50px' p={3} textAlign='start' borderRadius='3px' >
              <Text >Personal Info</Text>
          </Box>
          <VStack
                spacing={4}
                align='center'
                w='100%'
            >
                <UpdateDisabled w = '100%' name= "amka" />
                <UpdateInput w='100%' name= 'firstname'/>
                <UpdateInput w='100%' name= 'lastname'/>
                <UpdateInput w='100%' name= 'telephone'/>

          </VStack>
          </Box>
    )
}

export default PersonalInfo;