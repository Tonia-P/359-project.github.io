import {
    Tr,
    Td,
    IconButton,
    useColorModeValue
} from '@chakra-ui/react'
import { useState } from 'react';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import $ from 'jquery';
import { TiDelete } from "react-icons/ti";



const MessageRows = (info) =>{


    const color = useColorModeValue('gray.100', 'gray.700')
    const deleteHover = useColorModeValue('red.500', 'red.400')
    const [ isHovered, setIsHovered ] = useState(false);

    const getAllMessages = () => {

            const docVals = {
              doctor_id: info.info.doctor_id,
              username: info.info.sender
            }
            var urlEnd2 = 'http://localhost:8080/WebApplication1/AllMessages';
            var dets = JSON.stringify(docVals);
            $.ajax({
                url: urlEnd2,
                type: "POST",
                contentType: 'application/json',
                data: dets,
                success: function (result) {
                  console.log(info.info.sender);
                  console.log(info.info.doctor_id);
                  console.log("Success");
                  var json = JSON.parse(result);
                  console.log(result);
                 // <Link to="/allMessages"></Link>
                    //setIsLoaded(true);
                },
                error: function (result) {

                    console.log(info.info.sender);
                    console.log(info.info.doctor_id);
                    console.log("Fail");
                    console.log(result)
    
                    //setIsLoaded(false);
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
            onClick={getAllMessages}
        >
            <Td> { info.info.sender }</Td>
            <Td> { info.info.message }</Td>
            <Td> { info.info.date_time }</Td>
        </Tr>


    )
}


export default MessageRows;