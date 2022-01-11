import React from 'react';
import UpdateInput from '../../components/updatefields/UpdateInput';
import UpdateDisabled from '../../components/updatefields/UpdateDisabled';
import UpdatePassword from '../../components/updatefields/UpdatePassword';
import{
    Box,
    Text,
    VStack,
    useColorModeValue
}from'@chakra-ui/react'




const AccountInfo = () => {

    const color = useColorModeValue('white', 'gray.700')


    return(
        <Box borderWidth='1px' borderRadius='3px'  bg={color}>
          <Box bg='teal.400' h='50px' p={3} textAlign='start' borderRadius='3px' >
              <Text >Account Info</Text>
          </Box>
          <VStack
                spacing={4}
                align='center'
                w='100%'
            >
                <UpdateDisabled w = '100%' name= "Username" />
                <UpdateInput w='100%' name= 'email'/>
                <UpdatePassword w='100%'/>
          </VStack>
          </Box>
    )
}

export default AccountInfo;