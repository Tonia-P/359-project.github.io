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
import { UserContext } from '../../contexts/UserContext';
import { MessagesContext } from '../../contexts/MessagesContext';
import ChatRow from './ChatRow';
import ChatInput from './ChatInput';

  const Messages = () =>{

    const [ messages, setMessages ] = useState([]);
    const [ isLoaded, setIsLoaded ] = useState(false);
    const { userInfo } = useContext(UserContext);
    const { allMessages } = useContext(MessagesContext)


    useEffect(() => {
        console.log("In chat----------------")
      console.log(allMessages);
    
    }, [allMessages]);
    

   

    const leftColor = useColorModeValue('white', 'gray.700')

    return(

      <>
        
        <Heading fontSize='lg' mt={2} >{allMessages[0].sender}</Heading>
                            <Divider />

<VStack p={0} spacing='0px' h='100%' overflow='auto' overflow-x='hidden' w='100%'>
      {allMessages.reverse().map(message => <ChatRow message={message} key={message.message_id} />)}



      </VStack>



      <ChatInput />


</>
    )

  }
  export default Messages;