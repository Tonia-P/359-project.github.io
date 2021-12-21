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



const ListRow = (info) =>{


    return(
        <Tr>
            <Td>{ info.info.amka }</Td>
            <Td>{ info.info.test_date }</Td>
            <Td>{ info.info.medical_center }</Td>
            <Td> { info.info.blood_sugar }</Td>
            <Td> <LevelBadge level={ info.info.blood_sugar_level }/> </Td>
            <Td>{ info.info.cholesterol }</Td>
            <Td> <LevelBadge level={ info.info.cholesterol_level }/> </Td>
            <Td>{ info.info.iron }</Td>
            <Td> <LevelBadge level={ info.info.iron_level }/> </Td>
            <Td>{ info.info.vitamin_d3 }</Td>
            <Td> <LevelBadge level={ info.info.vitamin_d3_level }/> </Td>
            <Td>{ info.info.vitamin_b12 }</Td>
            <Td> <LevelBadge level={ info.info.vitamin_b12_level }/> </Td>
        </Tr>
    )
}


export default ListRow;