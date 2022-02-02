import {
    Tr,
    Td,
} from '@chakra-ui/react'
import React from 'react';



const TreatmentRow = ({ treatment }) =>{


    return(
        <Tr>
            <Td>{ treatment.start_date }</Td>
            <Td>{ treatment.end_date }</Td>
            <Td>{ treatment.treatment_text }</Td>
        </Tr>
    )
}


export default TreatmentRow;