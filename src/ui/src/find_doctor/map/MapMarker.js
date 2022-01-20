import React, { useState, useEffect, useContext } from 'react';

  import { MapContext } from '../../contexts/MapContext'
  import {
    Spinner,
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
require("leaflet-providers");





const MapMarker = ({ doctor }) => {

    

    const { userInfo } = useContext(UserContext)
    const { selectedDoctor, setSelectedDoctor } = useContext(MapContext)


    


    var position = [doctor.lat,  doctor.lon ];

    useEffect(() => {
      console.log(doctor)
    }, []);

    useEffect(() => {
        console.log('New selected doc.')
        console.log(selectedDoctor)
      }, [selectedDoctor]);
    
        
    return(
          <Marker position={position}>
            <Popup>
              {userInfo.lat + "  " + userInfo.lon}

            </Popup>
          </Marker>
    );



};
  
  export default MapMarker;