import React, { useContext } from 'react';
import DocList from '../dashboard/DocList';
import $ from 'jquery';
import {
  Heading, Button
} from '@chakra-ui/react';
import Fitness from '../dashboard/Fitness';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import { UserContext } from '../contexts/UserContext';


const Dashboard = () => {


  const { userInfo } = useContext(UserContext);

  const doctorDT = {
    doctor_id: '4'
  };

  const retPDF = () => {

        var dets = JSON.stringify(doctorDT);

        var urlEnd = 'http://localhost:8080/WebApplication1/RandevouzToPDF';
        console.log(dets);
        $.ajax({
            url: urlEnd,
            type: "POST",
            contentType: 'application/json',
            data: dets,
            success: function (result) {
              console.log("Success");
            },
            error: function (result) {
              console.log("Fail");
            }
        });

      }  

    return (

      <>

      <Heading>Welcome back, { userInfo.username }</Heading>
        <DocList />

        <Button>
          <Link to="/Profile">Profile</Link>
        </Button>

      <DocList />

      <Button onClick={retPDF}>
        RANDEVOUZ PDF
      </Button>

      <Fitness/>
      </>
    );
  };
  
  export default Dashboard;