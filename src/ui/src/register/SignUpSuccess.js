import React from 'react';
import { CheckCircleIcon } from '@chakra-ui/icons'
import { Stack, Text } from '@chakra-ui/react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react'

import UseForm from './TestRegister';



const FormSuccess = () => {

  const { values } = UseForm();


  return (


    
    <Stack maxWidth= {1000} margin= "auto" spacing={7} marginTop= {5} align= 'center'>
      <CheckCircleIcon w={100} h={100}  />
      <div className='form-content-right'>
        <h1 className='form-success'>We have received your request!</h1>
      </div>
      
      
      <Text fontSize='5xl' >Info.</Text>


      <Table variant='simple'>
        <TableCaption>Make sure they good to go.</TableCaption>
        <Thead>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Username</Td>
            <Td>{values.username} </Td>
            <Td isNumeric>25.4</Td>
          </Tr>
          <Tr>
            <Td>feet</Td>
            <Td>centimetres (cm)</Td>
            <Td isNumeric>30.48</Td>
          </Tr>
          <Tr>
            <Td>yards</Td>
            <Td>metres (m)</Td>
            <Td isNumeric>0.91444</Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Tfoot>
      </Table>
      
    </Stack>
    
    
    
  );
};

export default FormSuccess;