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
}from'@chakra-ui/react'

import $ from 'jquery';
import './style.css';
import { FaUserCheck } from "react-icons/fa";





const OverviewCardTwo = ({ topText, bottomText, topNumber, bottomNumber }) => {

    const gradient = useColorModeValue('box-light', 'box-dark')
    const letterColor = useColorModeValue('white', 'teal.200')
    const iconColor = useColorModeValue('white', '#2A4365')

    return(


        <Button 
            w='400px' 
            h='150px' 
            className={ gradient }  
            alignSelf='flex-start' >

            <Grid column='2' row='2' gap={2} w='100%'>

            <GridItem colStart={1} rowSpan={2} w='fit-content'>
            <Box 
                background={ letterColor } 
                h='100px' 
                w='90px' 
                borderRadius='30px'
                display='flex'
                justifyContent='center'
                alignItems='center'
                bgGradient='linear(to-r, #3A8DD0, #62BFD5)'
            >
                <FaUserCheck color={iconColor} size={60} />
            </Box>
            </GridItem>

            <GridItem 
                colStart={2} 
                rowStart={1} 
                rowSpan={1} 
                isTruncated
                w='250px' 
                h='80%'
                display='flex' 
                alignItems='flex-start'
                alignSelf='center'

            >
                <Text  fontSize='3xl'  color={ letterColor }  className='wrap' fontWeight="bold" > { topNumber } <Text  fontSize='2xl' w='100%' d="inline" fontWeight="normal" pt={2} >  { topText }  </Text> </Text>
                
             
            </GridItem>

            <GridItem 
                colStart={2} 
                rowStart={2} 
                rowSpan={1} 
                isTruncated
                w='250px' 
                h='80%'
                display='flex' 
                alignItems='flex-start'
                alignSelf='center'

            >
                <Text  fontSize='md'  color={ letterColor }  className='wrap'  > this week <Text  fontSize='xl' w='100%' d="inline" fontWeight="bold" pt={2} >  { bottomNumber }  </Text> </Text>
                
             
            </GridItem>

            </Grid>

            <Text
                position='absolute' 
                display='flex' 
                w='90%' 
                h='80%'
                justifyContent='flex-end'
                alignItems='flex-end'
                fontSize='md'
                color={ letterColor } 
                pb={0}
                
            >
                    Check <Text d="inline" fontSize='4xl'pl={2} mb={-2} > &rarr; </Text> 
            </Text>

          </Button>
    )
}


export default OverviewCardTwo;