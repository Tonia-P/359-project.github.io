import { useState, useEffect, useContext } from 'react';
import { 
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Skeleton,
} from '@chakra-ui/react';
import $ from 'jquery';
import MessageRows from './MessageRows';
import { UserContext } from '../contexts/UserContext';

  const AllMessages = () =>{

    const [ messages, setMessages ] = useState([]);
    const [ isLoaded, setIsLoaded ] = useState(false);
    const { userInfo } = useContext(UserContext);

    



    return(
        <Table variant='striped' colorScheme='grey'>
          {isLoaded ?
          <Tbody>
            
            {messages.map(message => <MessageRows info={message} key={message.username} />)}
          </Tbody>
          :
          <Tbody>
            <Tr>
            <Td><Skeleton height='40px' w='100%' /></Td>
            <Td><Skeleton height='40px' w='100%' /></Td>
            <Td><Skeleton height='40px' w='100%' /></Td>
            <Td><Skeleton height='40px' w='100%' /></Td>
            <Td><Skeleton height='40px' w='100%' /></Td>
            </Tr>
            <Tr>
            <Td><Skeleton height='40px' w='100%' /></Td>
            <Td><Skeleton height='40px' w='100%' /></Td>
            <Td><Skeleton height='40px' w='100%' /></Td>
            <Td><Skeleton height='40px' w='100%' /></Td>
            <Td><Skeleton height='40px' w='100%' /></Td>
            </Tr>
            <Tr>
            <Td><Skeleton height='40px' w='100%' /></Td>
            <Td><Skeleton height='40px' w='100%' /></Td>
            <Td><Skeleton height='40px' w='100%' /></Td>
            <Td><Skeleton height='40px' w='100%' /></Td>
            <Td><Skeleton height='40px' w='100%' /></Td>
            </Tr>
            <Tr>
            <Td><Skeleton height='40px' w='100%' /></Td>
            <Td><Skeleton height='40px' w='100%' /></Td>
            <Td><Skeleton height='40px' w='100%' /></Td>
            <Td><Skeleton height='40px' w='100%' /></Td>
            <Td><Skeleton height='40px' w='100%' /></Td>
            </Tr>
            <Tr>
            <Td><Skeleton height='40px' w='100%' /></Td>
            <Td><Skeleton height='40px' w='100%' /></Td>
            <Td><Skeleton height='40px' w='100%' /></Td>
            <Td><Skeleton height='40px' w='100%' /></Td>
            <Td><Skeleton height='40px' w='100%' /></Td>
            </Tr>
            <Tr>
            <Td><Skeleton height='40px' w='100%' /></Td>
            <Td><Skeleton height='40px' w='100%' /></Td>
            <Td><Skeleton height='40px' w='100%' /></Td>
            <Td><Skeleton height='40px' w='100%' /></Td>
            <Td><Skeleton height='40px' w='100%' /></Td>
            </Tr>
            <Tr>
            <Td><Skeleton height='40px' w='100%' /></Td>
            <Td><Skeleton height='40px' w='100%' /></Td>
            <Td><Skeleton height='40px' w='100%' /></Td>
            <Td><Skeleton height='40px' w='100%' /></Td>
            <Td><Skeleton height='40px' w='100%' /></Td>
            </Tr>
            <Tr>
            <Td><Skeleton height='40px' w='100%' /></Td>
            <Td><Skeleton height='40px' w='100%' /></Td>
            <Td><Skeleton height='40px' w='100%' /></Td>
            <Td><Skeleton height='40px' w='100%' /></Td>
            <Td><Skeleton height='40px' w='100%' /></Td>
            </Tr>
          </Tbody>
  }
        </Table>
    )
  }
  export default AllMessages;