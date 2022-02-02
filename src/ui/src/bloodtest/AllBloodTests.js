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

  const AllBloodTests = ({ amka }) =>{


    const [ tests, setTests ] = useState([]);
    const [ isLoaded, setIsLoaded ] = useState(false);


    useEffect (
    () => {
      var json_vals = JSON.stringify(amka);
      console.log(amka)
      
          var urlEnd = 'http://localhost:8080/WebApplication1/AmkaToBloodtests';
          $.ajax({
              url: urlEnd,
              type: "POST",
              contentType: 'json',
              data: json_vals,
              success: function (result) {
                console.log("Success");
                  const json = JSON.parse(result)
                  console.log(json)
  
                  setTests(json)
                  
              },
              error: function (result) {
                  console.log(result.responseText)
                  var json = JSON.parse(result.responseText)
                  console.log(json)
  
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