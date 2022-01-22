import { useState, useEffect, useContext } from 'react';
import { 
    InputGroup,
    Input,
    InputRightElement,
    Button
} from '@chakra-ui/react';
import $ from 'jquery';
import { UserContext } from '../../contexts/UserContext';
import { MessagesContext } from '../../contexts/MessagesContext';

  const ChatInput = () =>{

    const { userInfo } = useContext(UserContext);
    const { setAllMessages } = useContext(MessagesContext)



    return(

<InputGroup size='md'>
      <Input
        pr='4.5rem'
        type='text'
        placeholder='Send something.'
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' colorScheme='teal' size='sm' > Send
        </Button>
      </InputRightElement>
    </InputGroup>
    )

  }
  export default ChatInput;