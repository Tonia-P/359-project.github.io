import React, { useState, useMemo, useEffect, useContext } from 'react';
import{
    Divider,
    Grid,
    GridItem,
    HStack,
    useColorModeValue,
    VStack,
}from'@chakra-ui/react'

import dayjs from 'dayjs'
import DocList from './doctors_list/DocList';
import Map from './map/Map';
import { MapContext } from '../contexts/MapContext'
import $ from 'jquery'
import { UserContext } from '../contexts/UserContext';

const FindDoctor = () => {

    const [ allDoctors, setAllDoctors ] = useState([]);
    const [ selectedDoc, setSelectedDoc ] = useState([]);
    const [ isLoaded, setIsLoaded ] = useState(false)
    const { userInfo } = useContext(UserContext);

    const doctor = useMemo(() => ({ allDoctors, setAllDoctors, selectedDoc, setSelectedDoc }), 
    [ allDoctors, setAllDoctors, selectedDoc, setSelectedDoc ]);

    useEffect(
        () => {
    
          var urlEnd = 'http://localhost:8080/WebApplication1/AllDoctors';
            $.ajax({
                url: urlEnd,
                type: "GET",
                contentType: 'json',
                success: function (result) {
                    var json = JSON.parse(result)
                    setAllDoctors(json);
                    console.log(allDoctors)
                    //if (!Array.isArray(allDoctors)) return 'results are not array'
                    setIsLoaded(true);
                },
                error: function (result) {
                    console.log(result.responseText)
                    var json = JSON.parse(result.responseText)
                    console.log(json)
                }
            });
    
            
        },
        []
      );

    return(

<MapContext.Provider value= { doctor }>
        <HStack h='100%' position='fixed' w='100%'>

            <VStack w='300px' background='gray.600' h='100%'>
                <DocList/>
            </VStack>

            {userInfo.lat !==0 && <Map />}
        </HStack>

        </MapContext.Provider>
    )

}


export default FindDoctor;
