import {
    Tr,
    Td,
    IconButton,
    useColorModeValue
} from '@chakra-ui/react'
import React from 'react';
import $ from 'jquery';
import {TiTickOutline, TiTimesOutline } from "react-icons/ti";



const RowsDetsCrt = (info) =>{


    const color = useColorModeValue('gray.100', 'gray.700')
    
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

    const certify = () =>{

        var urlEnd = 'http://localhost:8080/WebApplication1/Certify';
        var json_val2 = JSON.stringify(info.info.username);
        console.log(json_val2);

        $.ajax({
            url: urlEnd,
            type: "POST",
            contentType: 'application/json',
            data: json_val2,
            success: function (result) {
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
            h='65px'
        >
            <Td>
                {
                <>
                <IconButton 
                    aria-label='Certify Doctor' 
                    _focus={{outline: '0px'}} 
                    background='transparent'  
                    isRound='true' 
                    icon={<TiTickOutline size='30px' />} 
                    size='30px'
                    _hover = {{color: 'green'}} 
                    onClick={ certify }
                    p='0'
                />
                <IconButton 
                    aria-label='Certify Doctor' 
                    _focus={{outline: '0px'}} 
                    background='transparent'  
                    isRound='true' 
                    icon={<TiTimesOutline size='30px' />} 
                    size='30px'
                    _hover = {{color: 'red'}} 
                    onClick={ deleteUser }
                    p='0'
                />
                </>
}
            </Td>
            <Td> { info.info.user_id}{ info.info.doctor_id }</Td>
            <Td> { info.info.username }</Td>
            <Td> { info.info.firstname + " " + info.info.lastname }</Td>
            <Td> { info.info.birthdate }</Td>
            <Td>{ info.info.specialty }</Td>
        </Tr>


    )
}


export default RowsDetsCrt;