import React, { useContext } from 'react';
import SettingsTab from '../../components/SettingsTab';
import{
    Grid,
    GridItem,
    Avatar,
    Text,
    VStack,
    Divider,
    useColorModeValue,
}from'@chakra-ui/react'

import { UserContext } from '../../contexts/UserContext';

import { Outlet } from 'react-router-dom';

const Profile=({ submitForm })=> {

    const { userInfo } = useContext(UserContext);
    const color = useColorModeValue('white', 'gray.700')

    
    
    return (<>
<Grid templateColumns='repeat(12, 1fr)' gap={4} h='100%' w='100%' >
  <GridItem colSpan={1} h='10' />

    <GridItem w='100%' colSpan={3} borderWidth='1px' borderRadius='3px' bg={color} h='max-content' >
        <VStack
            align='center'
            w='100%'
        >
            <Avatar my='30px' name={ userInfo.username } size='xl' src='https://bit.ly/tioluwani-kolawole' />
            <Text w='100%'> { userInfo.username } </Text>
            <Text w='100%'> { userInfo.amka } </Text>

            <Divider orientation='horizontal' />
            </VStack>
            <SettingsTab label='Account Info' path = "account"/>
            <SettingsTab label='Address Info' path = "address"/>
            <SettingsTab label='Personal Info' path = "personal"/>
            <SettingsTab label='Additional Info' path = "additional"/>
        
    </GridItem>


    
        <GridItem colSpan={6} >

            <Outlet/>
        
        </GridItem>

        
</Grid>





    </>
    )
  }

  
export default Profile;