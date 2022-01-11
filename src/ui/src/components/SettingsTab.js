import { useState, useEffect } from 'react';
import{
    Button
}from'@chakra-ui/react'

import { 
    BrowserRouter as 
    Link,
    useLocation 
} from 'react-router-dom'


const SettingsTab = (data) =>{

    const location = useLocation();

    const [style, setStyle] = useState(false);

    useEffect(() => {
        if(location.pathname === "/profile/" + data.path)
            setStyle(true)
        else
            setStyle(false)
        
    }, [location.pathname])

    return(
        <Link to={ "/profile/" + data.path } style={{ width: '100%' }}>
            <Button w='100%' colorScheme={style ? 'teal' : 'gray'} borderRadius='0px' border='1px' borderColor='#737373'>
                { data.label }
            </Button>
        </Link>
    )
}


export default SettingsTab