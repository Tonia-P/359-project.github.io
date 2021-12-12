import React from 'react';
import { CheckCircleIcon } from '@chakra-ui/icons'
import {
  Stack,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react'




const FormSuccess = ({ values }) => {



  return (
    <Stack maxWidth= {1000} margin= "auto" spacing={7} marginTop= {5} align= 'center'>
      <CheckCircleIcon w={100} h={100}  />
      <div className='form-content-right'>
        <h1 className='form-success'>We have received your request!</h1>
      </div>
      
      
      <Text fontSize='5xl' >Info.</Text>


      <Table variant='simple'>
        <TableCaption>Make sure they good to go. Or contact us at +30-696969696969</TableCaption>
        <Thead>
          <Tr>
            <Th>Field</Th>
            <Th>Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Username</Td>
            <Td>{values.username} </Td>
          </Tr>
          <Tr>
            <Td>Email</Td>
            <Td>{values.email}</Td>
          </Tr>
          <Tr>
            <Td>Birthday</Td>
            <Td>{values.birthdate}</Td>
          </Tr>
          <Tr>
            <Td>First name</Td>
            <Td>{values.firstname}</Td>
          </Tr>
          <Tr>
            <Td>Last name</Td>
            <Td>{values.lastname}</Td>
          </Tr>
          <Tr>
            <Td>Gender</Td>
            <Td>{values.gender}</Td>
          </Tr>
          <Tr>
            <Td>Height</Td>
            <Td>{values.height}</Td>
          </Tr>
          <Tr>
            <Td>Weight</Td>
            <Td>{values.weight}</Td>
          </Tr>
          <Tr>
            <Td>Location</Td>
            <Td>{values.address}, {values.city}, {values.country}</Td>
          </Tr>
          <Tr>
            <Td>Phone</Td>
            <Td>{values.phone}</Td>
          </Tr>
        </Tbody>
      </Table>
      
    </Stack>
    
    
    
  );
};

export default FormSuccess;