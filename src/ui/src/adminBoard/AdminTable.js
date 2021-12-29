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
                //const json = JSON.parse(result[0])
                //console.log(json);
                //console.log(result);
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
              <Th>Id</Th>
              <Th>Username</Th>
              <Th>Email</Th>
              <Th>Password</Th>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Date Of Birth</Th>
              <Th>Gender</Th>
              <Th>Social Security Number</Th>
              <Th>Country</Th>
              <Th>City</Th>
              <Th>Address</Th>
              <Th>lat</Th>
              <Th>lon</Th>
              <Th>Telephone</Th>
              <Th>Height</Th>
              <Th>Weight</Th>
              <Th>Volunteer Blood Donor</Th>
              <Th>Blood Type</Th>
              <Th>Specialty</Th>
              <Th>Doctor info</Th>
              <Th>Certified</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map(user => <RowsDets info={user} key={user.user_id} />)}
            {doctors.map(doctor => <RowsDets info={doctor} key={doctor.doctor_id} />)}
          </Tbody>
        </Table>
    )
  }
  export default AdminTable;