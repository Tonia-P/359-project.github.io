import React, { useState, useMemo } from 'react';
import{
    Divider,
    Grid,
    GridItem,
    useColorModeValue,
    VStack,
}from'@chakra-ui/react'

import Calendar from './components/calendar/Calendar';
import { DateContext } from '../contexts/DateContext';
import { RendezvousContext } from '../contexts/RendezvousContext';
import dayjs from 'dayjs'
import Agenda from './components/agenda/Agenda';
import './style.css'


const Rendezvous = () => {

    const leftColor = useColorModeValue('white', 'gray.700')


    const [ selectingDate, setSelectingDate] = useState(dayjs() );
    const [ selectedDate, setSelectedDate ] = useState( dayjs().minute(Math.floor(dayjs().minute())) );
    const [ selectedTime, setSelectedTime ] = useState(dayjs('2019-01-25') );
    const [ allRendezvous, setAllRendezvous ] = useState([])
    const [ selectedRendezvous, setSelectedRendezvous ] = useState({})
 

    const date = useMemo(() => ({ selectingDate, setSelectingDate, selectedDate, setSelectedDate, selectedTime, setSelectedTime }), 
    [ selectingDate, setSelectingDate, selectedDate, setSelectedDate, selectedTime, setSelectedTime ]);

    const rendezvous = useMemo(() => ({ allRendezvous, setAllRendezvous, selectedRendezvous, setSelectedRendezvous }), 
    [ allRendezvous, setAllRendezvous, selectedRendezvous, setSelectedRendezvous ]);

    return(

        <>
        <DateContext.Provider value= { date }>
            <RendezvousContext.Provider value= { rendezvous }>
        
                <Grid templateColumns='repeat(5, 1fr)' display='flex' h='100%' position='fixed' w='100%' p={0} >
                    <GridItem background={leftColor} h='100%' w='80%' colSpan={1} display='flex' justifyContent='center'>
                        <VStack>
                        <Calendar />
                    
                        <Divider />
                        </VStack>
                    </GridItem>
        
        
                    <GridItem  h='100%' w='100%' colSpan={1}>
                        {selectedDate && <Agenda/> }
                    </GridItem>
                    <GridItem  h='100%' w='100%' colSpan={1} borderLeft='1px' borderColor='gray.500'>
                        {selectedDate && selectedDate.format('YYYY-MM-DDTHH:mm:ss')}
                        {selectedRendezvous && selectedRendezvous.status}
                        <Divider></Divider>
                        {allRendezvous.map(item => {
          return <li>{item[0]}</li>;
        })}
                    </GridItem>
                    
                </Grid>
        
            </RendezvousContext.Provider>
        </DateContext.Provider>
        

        </>
    )
}


export default Rendezvous;
