import { useState, useEffect, useContext, useMemo } from 'react';
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
    HStack,
    Divider,
    Box,
    VStack,
    Heading
} from '@chakra-ui/react';
import $ from 'jquery';
import Chat from './chat/Chat'
import MessageRows from './all_messages/MessageRows';
import { UserContext } from '../contexts/UserContext';
import { MessagesContext } from '../contexts/MessagesContext';

  const Messages = () =>{

    const [ messages, setMessages ] = useState([]);
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ allMessages, setAllMessages ] = useState([]);
    const { userInfo } = useContext(UserContext);


    const message = useMemo(() => ({ allMessages, setAllMessages }), 
    [ allMessages, setAllMessages ]);


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
        

      <MessagesContext.Provider value = { message }>
      <Box  w='90%' position='fixed' background='gray.700' h='90%' mt={2} borderRadius='10px'>
        <HStack  borderRadius='10px' templateColumns='repeat(10, 1fr)' h='98%'  w='100%' p={0}  >
                        <VStack w='400px' h='100%' mt={3} overflow='auto' overflow-x='hidden'>
                            <Heading fontSize='lg' >All messages</Heading>
                            <Divider />
            
                            {messages.map(message => <MessageRows info={message} key={message.sender} />)}
         
                        
                        </VStack>


                        <VStack h='100%' w='100%'>
                          {allMessages[0] && <Chat /> }
                        </VStack>
        </HStack>
        </Box>

        </MessagesContext.Provider>
    )
  }
  export default Messages;