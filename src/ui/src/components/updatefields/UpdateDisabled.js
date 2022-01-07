
import {
    Box,
    Text,
    useColorModeValue
} from "@chakra-ui/react"
import { UserContext } from "../../contexts/UserContext"
import { useContext } from "react"



const UpdateDisabled = ({ name }) =>{


    const color = useColorModeValue('gray.600', 'gray.400')
    const { userInfo } = useContext(UserContext)


    return(
        <Box p='5' w="100%" align='start' color={color}>
                 <Text fontSize='sm' >{ name }</Text>
                 <Text fontSize='lg' >{ userInfo[name] }</Text>
            </Box>
    )
}

export default UpdateDisabled;