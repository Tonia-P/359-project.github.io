import React, { useContext } from 'react';
import{
    Button,
    Flex,
    Circle,
}from'@chakra-ui/react'
import { DateContext } from '../../../contexts/DateContext';

import dayjs from 'dayjs';


const CalendarTile = ({ date }) => {

    const { selectingDate, setSelectingDate, setSelectedDate } = useContext(DateContext);

    const handleClick = () =>{
        setSelectingDate(date.hour(8).minute(30));
        setSelectedDate(date.hour(8).minute(30));
    }

    return(
        <Button 
            colorScheme={date.format('DD/MM/YYYY') === selectingDate.format('DD/MM/YYYY') || 
            date.format('DD/MM/YYYY') === dayjs().format('DD/MM/YYYY') ? "teal" : 'gray'}
            
            variant={date.format('DD/MM/YYYY') === selectingDate.format('DD/MM/YYYY') ? 
                "solid" : date.format('DD/MM/YYYY') === dayjs().format('DD/MM/YYYY') ? 
                "outline" : 'ghost'
            }
            onClick={handleClick}
            h='35px'

        >
            <Flex 
                justifyContent='center' 
                position='absolute' 
                alignItems='flex-end' 
                h='40%' 
                w="100%"
                color = {date.format('MM') !== selectingDate.format('MM') && "gray.500" }
            >
            {date.format('DD')}
            </Flex>

            
            <Flex justifyContent='space-between' position='absolute' alignItems='flex-end' h='70%' w="40%">
            <Circle size='4px' bg='tomato' color='white'/>
            <Circle size='4px' bg='tomato' color='white'/>
            <Circle size='4px' bg='tomato' color='white'/>
            </Flex>
            
        </Button>
        
    )
}


export default CalendarTile;
