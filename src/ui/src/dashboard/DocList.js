import React, { useState, useEffect } from 'react';
import {
    Text,
    SimpleGrid,
    Spinner
  } from '@chakra-ui/react';
  import DocCard from './DocCard';
  import $ from 'jquery';


const DocList = (values, isLogged) => {


    const [ doctors, setDoctors ] = useState([]);
    const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(
    () => {
      console.log(values)

      var urlEnd = 'http://localhost:8080/WebApplication1/AllDoctors';
        $.ajax({
            url: urlEnd,
            type: "GET",
            contentType: 'json',
            success: function (result) {
                var json = JSON.parse(result)
                setDoctors(json);
                console.log(doctors)
                if (!Array.isArray(doctors)) return 'results are not array'
                setIsLoaded(true);
            },
            error: function (result) {
                console.log(result.responseText)
                var json = JSON.parse(result.responseText)
                console.log(json)
            }
        });

        
    },
    []
  );
  
  
    return (

        <>

        <Text>All doctors</Text>

       
        {isLoaded ?
        <SimpleGrid columns={[2, 3, 4]}  spacing='20px'>
            {doctors.map(doctor => <DocCard values={doctor} key={doctor.doctor_id} />)}
         </SimpleGrid>
        :
        <Spinner />
}




        </>

    );
  };
  
  export default DocList;