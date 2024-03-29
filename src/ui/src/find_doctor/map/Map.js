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
import MapMarker from './MapMarker';
require("leaflet-providers");





const Map = () => {

    

    const { userInfo } = useContext(UserContext)

    const { allDoctors, selectedDoc } = useContext(MapContext)
    const [ position, setPosition ] = useState([35.3361866,  25.1342504 ])
    const [map, setMap] = useState(null)


    useEffect(() => {
      if(selectedDoc){
      setPosition([ selectedDoc.lat, selectedDoc.lat ]);

      }
    }, [selectedDoc]);
    
    



    
        
    return(
        <>
        <MapContainer center={position} whenCreated={setMap} zoom={15} scrollWheelZoom={true} className='map_cont'>
          <TileLayer
            attribution= '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url='https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png'
            subdomains='abcd'
    
          />
          {allDoctors.map(doctor => <MapMarker doctor={doctor} map={map} key={doctor.doctor_id} />)}
        </MapContainer>


</>
    );



};
  
  export default Map;