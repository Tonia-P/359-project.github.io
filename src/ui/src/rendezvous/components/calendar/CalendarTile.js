import React, { useContext, useEffect } from 'react';
import{
    Button,
    Flex,
    Circle,
}from'@chakra-ui/react'
import { DateContext } from '../../../contexts/DateContext';
import { RendezvousContext } from '../../../contexts/RendezvousContext';
import { UserContext } from '../../../contexts/UserContext';

import dayjs from 'dayjs';
import $ from 'jquery';


const CalendarTile = ({ date }) => {

    const { selectingDate, selectedDate, setSelectingDate, setSelectedDate } = useContext(DateContext);
    const { allRendezvous, setAllRendezvous } = useContext(RendezvousContext);
    const { userInfo } = useContext(UserContext);

    const getRendevous = () => {
        const RandVals = {
            doctor_id: userInfo.doctor_id,
            date_time: date.hour(8).minute(30).format('YYYY-MM-DD')
        } 

        console.log('in getRends - rendVals')
        console.log(RandVals);

        var dets = JSON.stringify(RandVals);
        var returnee = [];

        var urlEnd = 'http://localhost:8080/WebApplication1/AllRendevous'
        $.ajax({
            url: urlEnd,
            type: "POST",
            contentType: 'application/json',
            data: dets,
            success: function (result) {
                var json = JSON.parse(result)
                //setAllRendezvous(json)
                console.log("in request - json: ")
                console.log(json)
                //console.log(result)
                console.log("Success");


                returnee = dontGetFormattedRends(json)
                console.log('neeewwwww')
                console.log(returnee)
                setAllRendezvous(returnee);
              
            },
            error: function (result) {
              console.log("Fail");
            }
        });

    }



    const dontGetFormattedRends = (array) => {
        if (array.length === 0) return [];
        var newArray= []
        for (let r of array){
            newArray =[
                ...newArray,
                {
                date_time: dayjs(r.date_time),
                status: r.status,
                randevouz_id: r.randevouz_id,
                price: r.price,
                doctor_info: r.doctor_info,
                user_info:r.userinfo
            }
        ]
        }
        //console.log('In dont format - new array: ')
        //console.log(newArray)
        return newArray;
        
    }



    const handleClick = () =>{

        console.log("--------------CLICK------------")

        setSelectingDate(date.hour(8).minute(30));
        setSelectedDate(date.hour(8).minute(30));
        //getRendevous();
        console.log('In handle click - new selected: ' + selectedDate.format('YYYY/MM/DD'))
        
        getRendevous(); 
        
    }

    return(
        <Button 
            colorScheme={date.format('DD/MM/YYYY') === selectingDate.format('DD/MM/YYYY') || 
            date.format('DD/MM/YYYY') === dayjs().format('DD/MM/YYYY') ? "teal" : 'gray'}
            
            variant={date.format('DD/MM/YYYY') === selectingDate.format('DD/MM/YYYY') ? 
                "solid" : date.format('DD/MM/YYYY') === dayjs().format('DD/MM/YYYY') ? 
                "outline" : 'ghost'
            }


            borderRadius='50px'
            onClick={handleClick}
            h='40px'

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
