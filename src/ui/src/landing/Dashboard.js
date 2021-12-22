import React, { useState, useEffect } from 'react';
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

const Dashboard = (values, isLogged) => {

  const [ info, setInfo ] = useState({});
  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(
    () => {
      setInfo(values.values)
      console.log(info)

      setIsLoaded(true);
    },
    []
  );
  
  
    return (

      <>

      <Heading>Welcome back, { values.values.username}.</Heading>


      <DocList />

      <Button>
        <Link to="/Profile">Profile</Link>
      </Button>

      {isLoaded ?
      <Fitness values={values.values} />
      :
      <Spinner/>
}
      </>
    );
  };
  
  export default Dashboard;