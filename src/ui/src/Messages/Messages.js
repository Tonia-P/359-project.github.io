import { useState, useEffect, useContext } from 'react';
import { 
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Skeleton,
    Grid,
    GridItem,
    useColorModeValue,
    Divider,
    Box,
    VStack,
    Heading
} from '@chakra-ui/react';
import $ from 'jquery';
import MessageRows from './MessageRows';
import { UserContext } from '../contexts/UserContext';

  const Messages = () =>{

    const [ messages, setMessages ] = useState([]);
    const [ isLoaded, setIsLoaded ] = useState(false);
    const { userInfo } = useContext(UserContext);

    useEffect (
    () => {
        const docVals = {
          doctor_id: userInfo.doctor_id
        }
        var urlEnd2 = 'http://localhost:8080/WebApplication1/getMessages';
        var dets = JSON.stringify(docVals);
        $.ajax({
            url: urlEnd2,
            type: "POST",
            contentType: 'application/json',
            data: dets,
            success: function (result) {
              console.log(userInfo);
              console.log(userInfo.doctor_id);
              console.log("Success");
              var json = JSON.parse(result);
              console.log(json);
                setMessages(json);
                setIsLoaded(true);
            },
            error: function (result) {
                console.log("Fail");
                console.log(result)

                setIsLoaded(false);
            }
        });
    }
    ,
    []);

    const leftColor = useColorModeValue('white', 'gray.700')

    return(
        

      <Box  w='90%' position='fixed' h='90%' mt={2} borderRadius='10px'>
        <Grid background={leftColor} borderRadius='10px' templateColumns='repeat(10, 1fr)' h='100%'  w='100%' p={0}  >
          <GridItem borderRight='1px' borderColor='gray.600' h='100%' colSpan={3} display='flex' justifyContent='center'>
                        <VStack w='100%' mt={3}>
                            <Heading fontSize='lg' >All messages</Heading>
                            <Divider />
            
            {messages.map(message => <MessageRows info={message} key={message.sender} />)}
         
                        
                        </VStack>
                    </GridItem>


                    <GridItem  h='100%'  colSpan={7} display='flex' justifyContent='center'>
                        <VStack>
                    
                        <Divider />
                        </VStack>
                    </GridItem>
        </Grid>
        </Box>
    )
  }
  export default Messages;