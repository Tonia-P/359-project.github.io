import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  //Link,
  VStack,
  //Code,
  Grid,
  theme,
} from '@chakra-ui/react';
//import RegisterForm from './register/SignUpForm';
import { ColorModeSwitcher } from './ColorModeSwitcher';
//import { Logo } from './Logo';
import Form from './register/Form';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Text fontSize='5xl' >Register</Text>
            <Form />
            
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
