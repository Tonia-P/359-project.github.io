import React, { useState, useEffect } from 'react';
import UpdateInput from '../../components/updatefields/UpdateInput';
import UpdateDisabled from '../../components/updatefields/UpdateDisabled';
import SettingsTab from '../../components/SettingsTab';
import UpdatePassword from '../../components/updatefields/UpdatePassword';
import{
    Editable,
    EditableInput, 
    EditablePreview,
    useEditableControls,
    ButtonGroup,
    IconButton,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
    Spinner,
    Flex,
    InputRightElement,
    InputGroup,
    Stack,
    Grid,
    InputLeftElement,
    GridItem,
    Box,
    Avatar,
    Text,
    VStack,
    Divider,
    Heading,
    useColorModeValue,
    Fade, ScaleFade, Slide, SlideFade,
    Collapse,
    useDisclosure,
    Wrap
}from'@chakra-ui/react'

import $ from 'jquery';
import OverviewCard from './OverviewCard';
import OverviewCardTwo from './OverviewCardTwo';
import { 
    BrowserRouter as Router, 
    Routes, 
    Route, 
    Link,
    Outlet
} from 'react-router-dom'


const Overview = () => {

    const color = useColorModeValue('white', 'gray.700')


    return(


        <Box w='85%'  >

            <Heading textAlign='start' size='md' my='6'> Overview </Heading>
            <Wrap spacing='30px' w='100%' m={0}>

                <Link to="/Certify">
                <OverviewCard number = {8}/>
                </Link>
                <OverviewCardTwo topText="new users today" topNumber="10"/>
                <OverviewCardTwo topText="revenue" topNumber="10080$" bottomNumber="30000$"/>

                </Wrap>
          </Box>
    )
}

export default Overview;