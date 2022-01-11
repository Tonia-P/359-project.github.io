import {
    Badge
} from '@chakra-ui/react'
import React, { useState, useEffect } from 'react';

const LevelBadge = (level) =>{

    const [ isBad, setIsBad ] = useState(false)


    useEffect(
        () =>{
            if(level.level === "Low" || level.level === "High") setIsBad(true);
        }
    )

    return(<>


        {isBad ?
            <Badge ml='1' fontSize='0.8em'  colorScheme='red'>
                { level.level }
            </Badge>
            :
            <Badge ml='1' fontSize='0.8em'  colorScheme='green'>
                { level.level }
            </Badge>
        }

        </>


    )
}


export default LevelBadge;