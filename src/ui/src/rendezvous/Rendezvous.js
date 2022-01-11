import React, { useState, useEffect, useMemo } from 'react';
import{
    Grid,
    GridItem,
    useColorModeValue,
}from'@chakra-ui/react'

import Calendar from './components/calendar/Calendar';
import { DateContext } from '../contexts/DateContext';
import { RendezvousContext } from '../contexts/RendezvousContext';
import dayjs from 'dayjs'
import Agenda from './components/agenda/Agenda';
import './style.css'


const Rendezvous = () => {

    const leftColor = useColorModeValue('white', 'gray.700')


    const [selectingDate, setSelectingDate] = useState(dayjs() );
    const [ selectedDate, setSelectedDate ] = useState( dayjs().minute(Math.floor(dayjs().minute())) );
    const [ selectedTime, setSelectedTime ] = useState(dayjs('2019-01-25') );
    const [ allRendezvous, setAllRendezvous ] = useState([
        {
            status: 'free',
            user_id: '0',
            date_time: dayjs('2022-01-26 15:00:00', 'YYYY-MM-DD HH:mm:ss'),
            price: '50'
        },
        {
            status: 'selected',
            user_id: '0',
            date_time: dayjs('2022-01-18 15:00:00', 'YYYY-MM-DD HH:mm:ss'),
            price: '50'
        },
        {
            status: 'selected',
            user_id: '0',
            date_time: dayjs('2022-01-16 15:00:00', 'YYYY-MM-DD HH:mm:ss'),
            price: '50'
        },
    ])


    useEffect(() => {
        console.log(allRendezvous)
    }, [])

    const date = useMemo(() => ({ selectingDate, setSelectingDate, selectedDate, setSelectedDate, selectedTime, setSelectedTime }), 
    [ selectingDate, setSelectingDate, selectedDate, setSelectedDate, selectedTime, setSelectedTime ]);

    const rendezvous = useMemo(() => ({ allRendezvous, setAllRendezvous }), [ allRendezvous, setAllRendezvous ]);

    return(

        <>
        <DateContext.Provider value= { date }>
        <RendezvousContext.Provider value= { rendezvous }>

            <Grid templateColumns='repeat(5, 1fr)' display='flex' h='100%' position='fixed' w='100%' p={0}>
                <GridItem background={leftColor} h='100%' w='80%' colSpan={1} display='flex' justifyContent='center'>
                <Calendar />
                </GridItem>


                <GridItem  h='100%' w='100%' colSpan={1}>
                    {selectedDate && <Agenda/> }
                </GridItem>
                <GridItem  h='100%' w='100%' colSpan={1} borderLeft='1px' borderColor='gray.500'>
                    {selectedDate && selectedDate.format('YYYY-MM-DDTHH:mm:ss')}
                </GridItem>
            </Grid>

        </RendezvousContext.Provider>
        </DateContext.Provider>
        

        </>
    )
}


export default Rendezvous;
