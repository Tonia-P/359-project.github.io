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
import BookForm from './book_form/BookForm'
import Map from './map/Map';
import { MapContext } from '../contexts/MapContext'
import $ from 'jquery'
import { UserContext } from '../contexts/UserContext';

const FindDoctor = () => {

    const [ allDoctors, setAllDoctors ] = useState([]);
    const [ selectedDoctor, setSelectedDoctor ] = useState({});
    const [ filteredDoctors, setFilteredDoctors ] = useState([]);
    const [ isDocLoaded, setIsDocLoaded ] = useState(false)
    const [ isLoaded, setIsLoaded ] = useState(false)
    const { userInfo, isLogged } = useContext(UserContext);

    const [ isBooking, setIsBooking ] = useState(false)

    const doctor = useMemo(() => ({ allDoctors, setAllDoctors, selectedDoctor, setSelectedDoctor, isBooking, setIsBooking, filteredDoctors, setFilteredDoctors }), 
    [ allDoctors, setAllDoctors, selectedDoctor, setSelectedDoctor, isBooking, setIsBooking, filteredDoctors, setFilteredDoctors ]);

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

                    

                    setIsDocLoaded(true);
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


      useEffect(() => {

        

        if(isLogged && isDocLoaded){
          var data= '';
        allDoctors.map((doc) => data = data + doc.lat + ',' + doc.lon + ';')
                    console.log(data)

                    console.log("https://trueway-matrix.p.rapidapi.com/CalculateDrivingMatrix?origins="+ userInfo.lat + ',' + userInfo.lon + '&destinations=' + data);

                    fetch("https://trueway-matrix.p.rapidapi.com/CalculateDrivingMatrix?origins=" + data + '&destinations=' + userInfo.lat + ',' + userInfo.lon , {
                    	"method": "GET",
                    	"headers": {
                    		"x-rapidapi-host": "trueway-matrix.p.rapidapi.com",
                    		"x-rapidapi-key": "36fc04be0cmsh6b954fe89f7caa4p174e39jsn1c14d11d8a9f"
                    	}
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log("1. Success!")
                        console.log(data);
                        var mapping = []
                        var i = 0;

                        console.log(data.distances)
                        console.log(data.distances[0])
                        console.log(data.distances[0][0])

                        allDoctors.map(doc => {mapping[i]= {...doc, distance: data.distances[i][0], duration: data.durations[i][0]}; i++ })
                        setAllDoctors(mapping)
                        setFilteredDoctors(mapping)

                        console.log(allDoctors)
                        console.log(mapping)
                        
                      })
                    .catch(err => {
                    	console.error(err);
                    });
                }
                else if (isLogged === 0) setFilteredDoctors(allDoctors)

      }, [isDocLoaded, isLogged]);
      

    return(

<MapContext.Provider value= { doctor }>
        <HStack h='90vh' position='fixed' w='100%' display='flex' alignItems='flex-start'>

            <VStack w='400px' background='' h='100%'>
                {isBooking ? <BookForm /> : <DocList/> }
            </VStack>

            {userInfo.lat !==0 && <Map />}
        </HStack>

        </MapContext.Provider>
    )

}


export default FindDoctor;
