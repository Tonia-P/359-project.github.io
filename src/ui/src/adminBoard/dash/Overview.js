import React from 'react';
import{
    Box,
    Heading,
    Wrap
}from'@chakra-ui/react';
import OverviewCard from './OverviewCard';
import OverviewCardTwo from './OverviewCardTwo';
import { 
    BrowserRouter as Link
} from 'react-router-dom'


const Overview = () => {


    return(


        <Box w='85%'  >

            <Heading textAlign='start' size='md' my='6'> Overview </Heading>
            <Wrap spacing='30px' w='100%' m={0}>

                <Link to="/Certify">
                <OverviewCard number = {8}/>
                </Link>
                <OverviewCardTwo topText="new users today" topNumber="10"/>
                <OverviewCardTwo topText="revenue" topNumber="10080$" bottomNumber="30000$"/>

                </Wrap>
          </Box>
    )
}

export default Overview;