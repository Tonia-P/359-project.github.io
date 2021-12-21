import { useState, useEffect } from 'react';
import { 
    Grid, 
    GridItem, 
    Stack,
    Button,
    useBoolean
    
} from '@chakra-ui/react'
import { 
    BrowserRouter as Router, 
    Routes, 
    Route, 
    Link,
    Outlet
} from 'react-router-dom'
import AllBloodTests from './AllBloodTests'
import $ from 'jquery';


const BloodTestMenu = () =>{

    return (
        <Stack>
            <Button>
                <Link to="/bloodtest/allbloodtests">All blood tests</Link>
            </Button>



            <Outlet />
        </Stack>
    )
}

export default BloodTestMenu;