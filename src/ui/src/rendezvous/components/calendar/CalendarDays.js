import React, { useState, useEffect, useContext } from 'react';
import{
    Grid,
    GridItem,
}from'@chakra-ui/react'
import { DateContext } from '../../../contexts/DateContext';

import CalendarTile from './CalendarTile';


const CalendarDays = () => {


     
    const { selectingDate } = useContext(DateContext);

    const startDate = selectingDate.startOf('month').startOf('week');
    const [ allDays, setAllDays] = useState([]);

    useEffect(() => {
        setAllDays(getDays());

    }, [selectingDate])



    const getDays = () => {
        var tmp = startDate;
        var i = 0;

        while( i !== 42 ){
            var tmpp = [...tmpp, tmp];
            tmp = tmp.add(1, 'day');
            i++;

        }

        tmpp.shift();
        return tmpp;
    }
    

    return(
        <Grid templateColumns='repeat(7, 1fr)'  templateRows='repeat(6, 1fr)' w='100%'>
                {allDays.map(date =>
                    <GridItem key={date}>
                        <CalendarTile date={date}  />
                    </GridItem>  
                    )
                }
        </Grid>
    )
}


export default CalendarDays;
