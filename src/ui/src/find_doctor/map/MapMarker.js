import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';

  import { MapContext } from '../../contexts/MapContext'
  import {
    Spinner,
    Text,
    VStack,
    Divider,
    Heading,
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




require("leaflet-providers");
const MapMarker = ({ doctor, map }) => {

    

    const { userInfo } = useContext(UserContext)
    const { selectedDoctor, setSelectedDoctor } = useContext(MapContext)
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
    
        
    return(
          <Marker position={position} ref={circleRef}>
            <Popup>
                <VStack display='flex'>
                    <Heading fontSize='md'>{doctor.username}</Heading>

                    <Divider/>

                    <Icon as={AiFillCar} w={6} h={6} />

                    <Divider/>

                    <Button colorScheme='teal'>Book</Button>
                </VStack>
              

            </Popup>
          </Marker>
    );



};
  
  export default MapMarker;