import { useEffect } from 'react';
import { 
    Stack,
    FormControl, 
    FormLabel, 
    FormHelperText,
    Input, 
    FormErrorMessage,
    HStack,
    Box,
    Flex
} from '@chakra-ui/react'
import Graph from './graph/Graph';
import BloodTestForm from './form/BloodTestForm';
import { NavigateFunction, useLocation, useNavigate, useParams } from "react-router";
import AllBloodTests from './AllBloodTests';
import TreatmentForm from './form/TreatmentForm';



const SubmitTreatment = () =>{

    const params = useParams();

    useEffect(() => {
      console.log(params)
    }, []);
    


    return (
        <Box h='92vh' w='100%'>
        
        <Flex h='100%' justifyContent='center' alignItems='center'>

        <Graph amka={params}/>
        <TreatmentForm params={params}/>
        </Flex>

        <AllBloodTests amka={params} />
        </Box>
    )
}

export default SubmitTreatment;