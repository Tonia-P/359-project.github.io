import {
    Tr,
    Td,
    IconButton,
    useColorModeValue
} from '@chakra-ui/react'
import { useState } from 'react';
import React from 'react';
import $ from 'jquery';
import { TiDelete } from "react-icons/ti";



const MessageRows = (info) =>{


    const color = useColorModeValue('gray.100', 'gray.700')
    const deleteHover = useColorModeValue('red.500', 'red.400')
    const [ isHovered, setIsHovered ] = useState(false);
    
    

    return(
        <Tr 
            _hover = {{background: color}} 
            onMouseEnter={() => {
                setIsHovered(true)
            }}
            onMouseLeave={() => {
                setIsHovered(false)
            }}
            h='65px'
        >
            <Td> { info.info.sender }</Td>
            <Td> { info.info.message }</Td>
            <Td> { info.info.date_time }</Td>
        </Tr>


    )
}


export default MessageRows;