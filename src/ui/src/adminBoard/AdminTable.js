import { useState, useEffect } from 'react';
import { 
    Grid, 
    GridItem, 
    Stack,
    Button,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    Skeleton,
    TableCaption
} from '@chakra-ui/react';
import { 
    BrowserRouter as Router, 
    Routes, 
    Route, 
    Link,
    Outlet
} from 'react-router-dom';
import $ from 'jquery';
import RowsDets from './RowsDets';

  const AdminTable = () =>{


    const [ users, setUsers ] = useState([]);
    const [ doctors, setDoctors ] = useState([]);
    const [ isLoaded, setIsLoaded ] = useState(false);


    useEffect (
    () => {
        var urlEnd = 'http://localhost:8080/WebApplication1/ListUsersArr';
        $.ajax({
            url: urlEnd,
            type: "GET",
            contentType: 'application/json',
            success: function (result) {
              console.log("Success");
              console.log(result);
                //const json = JSON.parse(result[0])
                //console.log(json);
                //console.log(result);
                setUsers(result);
                //setInfo(result)
                console.log(users);
            },
            error: function (result) {
                console.log("Fail");
                console.log(result)
                //var json = JSON.parse(result.responseText)
                //console.log(json)
            }
        });

    var urlEnd2 = 'http://localhost:8080/WebApplication1/AllDoctorsArr';
        $.ajax({
            url: urlEnd2,
            type: "GET",
            contentType: 'application/json',
            success: function (result) {
              console.log("Success");
              console.log(result);
                setDoctors(result);
                //setInfo(result)
                console.log(doctors);
                setIsLoaded(true);
            },
            error: function (result) {
                console.log("Fail");
                console.log(result)
                //var json = JSON.parse(result.responseText)
                //console.log(json)

                setIsLoaded(false);
            }
        });
    }
    ,
    []);


    useEffect(
        () => {
            console.log("Info changed")
            console.log(users)
        }
        , 
        [users]
    )



    return(
        <Table variant='striped' colorScheme='grey'>
          <Thead>
            <Tr>
              <Th>Action</Th>
              <Th>Id</Th>
              <Th>Username</Th>
              <Th>Name</Th>
              <Th>Date Of Birth</Th>
            </Tr>
          </Thead>
          {isLoaded ?
          <Tbody>
            
            {users.map(user => <RowsDets info={user} key={user.user_id} />)}
            {doctors.map(doctor => <RowsDets info={doctor} key={doctor.doctor_id} />)}
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
          </Tbody>
  }
        </Table>
    )
  }
  export default AdminTable;