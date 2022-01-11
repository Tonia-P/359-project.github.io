import { useState, useEffect } from 'react';
import { 
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
} from '@chakra-ui/react';
import $ from 'jquery';
import ListRow from './ListRow';

  const AllBloodTests = () =>{


    const [ tests, setTests ] = useState([]);
    const [ isLoaded, setIsLoaded ] = useState(false);


    useEffect (
    () => {
        var urlEnd = 'http://localhost:8080/WebApplication1/rest/bloodtests/list';
        $.ajax({
            url: urlEnd,
            type: "GET",
            contentType: 'application/json',
            success: function (result) {
              console.log("Success");
              console.log(result);
                setTests(result);
                //setInfo(result)
                console.log(tests);
                setIsLoaded(true);
            },
            error: function (result) {
                console.log("Fail");
                console.log(result);

                setIsLoaded(false);
            }
        });
    }
    ,
    []);


    useEffect(
        () => {
            console.log("Info changed")
            console.log(tests)
        }
        , 
        [tests]
    )



    return(
        <Table variant='striped' colorScheme='grey'>
          <Thead>
            <Tr>
              <Th>Amka</Th>
              <Th>Date</Th>
              <Th>Medical Center</Th>
              <Th>Blood Sugar</Th>
              <Th>Blood sugar level</Th>
              <Th>Cholesterol</Th>
              <Th>Cholesterol level</Th>
              <Th>Iron</Th>
              <Th>Iron level</Th>
              <Th>Vitamin D3</Th>
              <Th>Vitamin D3 level</Th>
              <Th>Vitamin B12</Th>
              <Th>Vitamin B12 level</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tests.map(test => <ListRow info={test} key={test.bloodtest_id} />)}
          </Tbody>
        </Table>
    )
  }

  export default AllBloodTests;