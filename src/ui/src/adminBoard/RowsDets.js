import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    Divider,
    HStack,
    Stack,
    IconButton,
    useColorModeValue
} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import React from 'react';
import $ from 'jquery';
import LevelBadge from '../components/LevelBadge';
import { TiDeleteOutline, TiDelete } from "react-icons/ti";



const RowsDets = (info) =>{


    const color = useColorModeValue('gray.100', 'gray.700')
    const deleteHover = useColorModeValue('red.500', 'red.400')
    const [ isHovered, setIsHovered ] = useState(false);
    
    const deleteUser = () =>{

        var urlEnd = 'http://localhost:8080/WebApplication1/DeleteUser';
        var json_val = JSON.stringify(info.info.username);

        $.ajax({
            url: urlEnd,
            type: "POST",
            contentType: 'application/json',
            data: json_val,
            success: function (result) {
            console.log("Success");
            console.log(result);
            window.location.reload();
            },
            error: function (result) {
            console.log("Fail");
            console.log(result.status);
            }
        });

    }

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
            <Td>
                {isHovered ? 
                <IconButton 
                    aria-label='Delete user from database' 
                    _focus={{outline: '0px'}} 
                    background='transparent'  
                    isRound='true' 
                    icon={<TiDelete size='30px' />} 
                    size='30px'
                    _hover = {{color: deleteHover}} 
                    onClick={ deleteUser }
                    p='0'
                />
                :
                <></>
}
            </Td>
            <Td> { info.info.user_id}{ info.info.doctor_id }</Td>
            <Td> { info.info.username }</Td>
            <Td> { info.info.firstname + " " + info.info.lastname }</Td>
            <Td> { info.info.birthdate }</Td>
        </Tr>


    )
}


export default RowsDets;