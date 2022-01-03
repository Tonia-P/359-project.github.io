
import {
    Box,
    Text,
    useColorModeValue
} from "@chakra-ui/react"



const UpdateDisabled = (values) =>{


    const color = useColorModeValue('gray.600', 'gray.400')


    return(
        <Box p='5' w="100%" align='start' color={color}>
                 <Text fontSize='sm' >{ values.values[0] }</Text>
                 <Text fontSize='lg' >{ values.values[1] }</Text>
            </Box>
    )
}

export default UpdateDisabled;