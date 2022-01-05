import { useState, useEffect } from 'react';
import{
    Editable,
    EditableInput, 
    EditablePreview,
    useEditableControls,
    ButtonGroup,
    IconButton,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
    Spinner,
    Flex,
    InputRightElement,
    InputGroup,
    Stack,
    Grid,
    Box,
    Text,
    InputLeftElement,
    GridItem,
    Skeleton
}from'@chakra-ui/react'

import { 
    BrowserRouter as Router, 
    Routes, 
    Route, 
    Link,
    Outlet,
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