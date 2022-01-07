import React, { useState, useEffect, useContext } from 'react';
import DocList from '../dashboard/DocList';
import {
  Heading, Spinner, Button
} from '@chakra-ui/react';
import Fitness from '../dashboard/Fitness';

import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link,
  Outlet
} from 'react-router-dom'

import { UserContext } from '../contexts/UserContext';


const Dashboard = () => {


  const { userInfo } = useContext(UserContext);
  
    return (

      <>

      <Heading>Welcome back, { userInfo.username }</Heading>


      <DocList />

      <Button>
        <Link to="/Profile">Profile</Link>
      </Button>

      <Fitness/>
      </>
    );
  };
  
  export default Dashboard;