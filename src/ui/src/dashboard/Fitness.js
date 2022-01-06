import React, { useState, useEffect, useContext } from 'react';
import {
    Text,
    SimpleGrid,
    Spinner,
    Editable,
    EditablePreview,
    EditableInput,
    Box,
    FormControl,
    FormLabel,
    Divider,
    Input,
    Button,
    Grid,
    Icon
  } from '@chakra-ui/react';
  import $ from 'jquery';
  import { UserContext } from '../contexts/UserContext';

  
const Fitness = () => {

  const { userInfo } = useContext(UserContext);


    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ bmi, setBMI ] = useState('')
    const [ ideal, setIdeal ] = useState('')
    const [ FitnessLoaded, setFitnessLoaded ] = useState(false);
    const [ fitVals, setFitVals ] = useState({
      weight: '',
      height: ''
    })

  
    useEffect(
      () => {

        console.log("IN FITNESS");
        console.log(userInfo)

        //console.log(info)
        //console.log(values.values.weight);
        console.log("put fitvals")
        setFitVals({
          weight: userInfo.weight,
          height: userInfo.height
        });

        console.log(fitVals)
      },
      [userInfo]
    );

    useEffect(
      () => {
        console.log(fitVals)
        setIsLoaded(true);
      },
      [fitVals]
    );
    

    useEffect(
      () => {
        console.log("----FIT LOADED");
        console.log(bmi + "  --- " + ideal);
        setFitnessLoaded(true);
      },
      [bmi]
    );


    const fitnessRequest = () =>{
                      
      fetch("https://fitness-calculator.p.rapidapi.com/bmi?age=25&weight=" + Math.floor(fitVals.weight) + "&height=" + fitVals.height, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "fitness-calculator.p.rapidapi.com",
          "x-rapidapi-key": "36fc04be0cmsh6b954fe89f7caa4p174e39jsn1c14d11d8a9f"
        }
      })
      .then(response => response.json())
          .then(data => {
            console.log("1. Success!")
            console.log(data);
            setBMI(data.data.bmi);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    

      fetch("https://fitness-calculator.p.rapidapi.com/idealweight?gender=male&height=" + fitVals.height, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "fitness-calculator.p.rapidapi.com",
          "x-rapidapi-key": "36fc04be0cmsh6b954fe89f7caa4p174e39jsn1c14d11d8a9f"
        }
      })
      .then(response => response.json())
          .then(data => {
            console.log("2. Success!")
            console.log(data);
            setIdeal(data.data.Hamwi);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    }




      // Sets form data.
  const handleChange = e => {
    const { name, value } = e.target;
    setFitVals({
      ...fitVals,
      [name]: value
    });
    console.log(fitVals);
  };

    return (

      <>
        <Text>Fitness Tracker</Text>

      <Grid templateColumns='repeat(12, 1fr)' align='center' >
      { isLoaded ?

        <Box minW="220px" borderWidth='2px' borderRadius='lg' overflow='hidden' minH="270px">
          <Text>Kappa</Text>
          <Divider orientation='horizontal' height="10px"/>



          <FormControl id= "weight">
              <FormLabel>Weight</FormLabel>
              <Input 
                type= "text" 
                name= "weight"
                autoComplete= "on"
                value= {fitVals.weight}
                onChange= {handleChange} 
                />
          </FormControl>


          <FormControl id= "height">
            <FormLabel>Height</FormLabel>
            <Input 
                type= "text" 
                name= "height"
                autoComplete= "on"
                value= {fitVals.height}
                onChange= {handleChange} 
                />
          </FormControl>

          <Button
            mt={2}
            colorScheme="teal"
            type="submit"
            onClick={fitnessRequest}
            >
            Submit
          </Button>


        </Box>

        :

        <Spinner />
      }

<Box minW="220px" borderWidth='2px' borderRadius='lg' overflow='hidden' minH="270px">
          <Text>Kappa</Text>
          <Divider orientation='horizontal' height="10px"/>

          {FitnessLoaded ?
          <>
          <Text>BMI: {bmi} </Text>
          <Text>Ideal weight: {ideal} </Text>
</>
          :

          <Spinner/>
}


        </Box>


      

      </Grid>
      </>

    );
};
  
  export default Fitness;