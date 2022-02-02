import { useState, useEffect } from 'react';
import { 
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
} from '@chakra-ui/react';
import $ from 'jquery';
import TreatmentRow from './TreatmentRow';

  const TreatmentTable = ({ user_id }) =>{


    const [ tests, setTests ] = useState([]);
    const [ isLoaded, setIsLoaded ] = useState(false);


    useEffect (
    () => {
      var json_vals = JSON.stringify(user_id);
      console.log(user_id)
      
          var urlEnd = 'http://localhost:8080/WebApplication1/GetUserTreatments';
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
              <Th>Start Date</Th>
              <Th>Start Date</Th>
              <Th>Treatment text</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tests.map(treatment => <TreatmentRow key={treatment.treatment_id} treatment={treatment} />)}
          </Tbody>
        </Table>
    )
  }

  export default TreatmentTable;