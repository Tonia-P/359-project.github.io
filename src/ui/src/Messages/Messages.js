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
              console.log(result);
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
  export default Messages;