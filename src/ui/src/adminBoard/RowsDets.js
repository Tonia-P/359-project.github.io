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
    Stack
} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import React from 'react';
import $ from 'jquery';
import LevelBadge from '../components/LevelBadge';



const RowsDets = (info) =>{


    return(
        <Tr>
            <Td> { info.info.user_id}{ info.info.doctor_id }</Td>
            <Td> { info.info.username }</Td>
            <Td> { info.info.email }</Td>
            <Td> { info.info.password }</Td>
            <Td> { info.info.firstname }</Td>
            <Td> { info.info.lastname }</Td>
            <Td> { info.info.birthdate }</Td>
            <Td> { info.info.gender }</Td>
            <Td> { info.info.amka }</Td>
            <Td> { info.info.country } </Td>
            <Td> { info.info.city }</Td>
            <Td> { info.info.address } </Td>
            <Td> { info.info.lat }</Td>
            <Td> { info.info.lon } </Td>
            <Td> { info.info.telephone } </Td>
            <Td> { info.info.height }</Td>
            <Td> { info.info.weight } </Td>
            <Td> { info.info.blooddonor }</Td>
            <Td> { info.info.bloodtype } </Td>
            <Td> { info.info.specialty } </Td>
            <Td> { info.info.doctor_info }</Td>
            <Td> { info.info.certified } </Td>
        </Tr>
    )
}


export default RowsDets;