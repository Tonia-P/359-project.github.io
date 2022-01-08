import { useState, useEffect } from 'react';
import { 
    Grid, 
    GridItem, 
    Stack,
    Button,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    Skeleton,
    TableCaption
} from '@chakra-ui/react';
import { 
    BrowserRouter as Router, 
    Routes, 
    Route, 
    Link,
    Outlet
} from 'react-router-dom';
import $ from 'jquery';
import RowsDets from './RowsDets';
import Overview from './dash/Overview';




const AdminDashBoard = () =>{




    return(

<>
        <Overview />

        </>

    )
  }
  export default AdminDashBoard;