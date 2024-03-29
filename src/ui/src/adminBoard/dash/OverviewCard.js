import{
    Grid,
    GridItem,
    Box,
    Text,
    useColorModeValue,
    Circle,
    Button,
    Flex
}from'@chakra-ui/react'
import './style.css';
import { FaUserCheck } from "react-icons/fa";


const OverviewCard = ({number}) => {

    const gradient = useColorModeValue('box-light', 'box-dark')
    const letterColor = useColorModeValue('white', 'teal.200')
    const iconColor = useColorModeValue('white', '#2A4365')


     

    return(


        <Button 
            w='400px' 
            h='150px'
            className= { gradient }  
            alignSelf='flex-start' >


{number !== 0 &&
<Flex position='absolute' display='flex' w='95%' h='75%' >
            <Circle size='25px' bg='tomato' color='white'   />
            </Flex>

}
            <Grid column='2' row='2' gap={1} w='100%'>




            <GridItem colStart={1} rowSpan={2} w='fit-content'>
            <Box 
                background={ letterColor }  
                h='100px' 
                w='90px' 
                borderRadius='30px'
                display='flex'
                justifyContent='center'
                alignItems='center'
                bgGradient='linear(to-r, #3A8DD0, #62BFD5)'
            >
                <FaUserCheck color={iconColor} size={60} />
            </Box>
            </GridItem>

            <GridItem 
                colStart={2} 
                rowStart={1} 
                rowSpan={2} 
                isTruncated
                w='250px' 
                h='80%'
                display='flex' 
                alignItems='flex-start'
                alignSelf='center'

            >
                <Text  fontSize='3xl'  color={ letterColor } className='wrap' fontWeight="bold" > {number === 0 ? "No" : number} <Text  fontSize='2xl' w='100%' d="inline" fontWeight="normal" pt={2} >  pending approval requests </Text> </Text>
                
             
            </GridItem>

            <GridItem colStart={2} rowStart={2} >
            <Box w='100%'>
            <Text textAlign='start' size='lg' > </Text>
            </Box>
            </GridItem>

            </Grid>

            <Text
                position='absolute' 
                display='flex' 
                w='90%' 
                h='80%'
                justifyContent='flex-end'
                alignItems='flex-end'
                fontSize='md'
                color={ letterColor } 
                pb={0}
                
            >
                    Check <Text d="inline" fontSize='4xl'pl={2} mb={-2} > &rarr; </Text> 
            </Text>

          </Button>
    )
}


export default OverviewCard;
