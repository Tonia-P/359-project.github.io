import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';

  import { MapContext } from '../../contexts/MapContext'
  import {
    Spinner,
    Text,
    VStack,
    Divider,
    Heading,
    Flex,
    Icon,
    Button
  } from '@chakra-ui/react';
  import 'leaflet/dist/leaflet.css';
  import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
  import 'leaflet-defaulticon-compatibility';
  import { 
    MapContainer,
    TileLayer,
    Marker,
    useMapEvents,
    Popup
} from 'react-leaflet'
import L from "leaflet";
import { UserContext } from '../../contexts/UserContext';
import './mapStyle.css'


import { AiFillCar } from 'react-icons/ai';
import { FaRoad, FaMapMarkedAlt } from 'react-icons/fa';
import { ImLocation } from 'react-icons/im';



require("leaflet-providers");
const MapMarker = ({ doctor, map }) => {

    

    const { userInfo } = useContext(UserContext)
    const { selectedDoctor, setSelectedDoctor, setIsBooking } = useContext(MapContext)
    const circleRef = useRef()


    const onClick = useCallback(() => {
        map.setView([doctor.lat,  doctor.lon ], 15)
      }, [map])


    var position = [doctor.lat,  doctor.lon ];

    useEffect(() => {
      console.log(doctor)
    }, []);

    useEffect(() => {
        console.log('New selected doc.')
        console.log(selectedDoctor)
        var radius = null
        if(doctor == selectedDoctor) {
            radius = circleRef.current.openPopup()
            map.setView([doctor.lat,  doctor.lon ], 15)
        }
      }, [selectedDoctor]);


      const handleClick = () =>{

        setSelectedDoctor(doctor);
      }


      const handleBook = () =>{
        setIsBooking(true)
      }

    
        
    return(
          <Marker position={position} eventHandlers={{ click: handleClick }} ref={circleRef}>
            <Popup>
                <VStack display='flex'>
                    <Heading fontSize='md' isTruncated>{doctor.firstname + ' ' + doctor.lastname }</Heading>

                    <Divider/>

                    <Flex justifyContent='space-between' h='30px' w='100%' alignItems='center'>
                        <Icon as={FaMapMarkedAlt} color='white' w={7} h={7} mr={3}/>
                        <Text fontWeight='bold' fontSize='md'>{doctor.address}</Text>
                    </Flex>

                    <Flex justifyContent='space-between' w='100%' h='30px' alignItems='center'>
                        <Icon as={AiFillCar} w={7} h={7} />
                        <Text fontWeight='bold' fontSize='md'>{ doctor.duration + ' seconds' }</Text>
                    </Flex>
                    <Flex justifyContent='space-between' h='30px' w='100%' alignItems='center'>
                        <Icon as={FaRoad} w={7} h={7} />
                        <Text fontWeight='bold' fontSize='md'>{ doctor.distance/100 + ' km' }</Text>
                    </Flex>
                    

                    <Button colorScheme='teal' onClick={handleBook}>Book</Button>
                </VStack>
              

            </Popup>
          </Marker>
    );



};
  
  export default MapMarker;