import React, { useState, useEffect, useContext } from 'react';
import {
    Text,
    Spinner,
    Box,
    FormControl,
    FormLabel,
    Divider,
    Input,
    Button,
    Flex,
    Grid,
    VStack,
    HStack,
    Heading,
    FormErrorMessage
  } from '@chakra-ui/react';
  import { UserContext } from '../../contexts/UserContext';

  import dayjs from 'dayjs';
  import $ from 'jquery';


  
const BloodTestForm = ({ amka }) => {

  const [ allPatients, setAllPatients ] = useState([])
  const { userInfo } = useContext(UserContext);
  const [ isNext, setIsNext ] = useState(false)

  const [ values, setValues ] = useState({
      amka: amka.amka,
      test_date: '',
      medical_center: '',
      blood_sugar: null,
      cholesterol: null,
      iron: null,
      vitamin_d3: null,
      vitamin_b12: null
  })
  const [ errors, setErrors ] = useState({
  })

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
    console.log(values);
  };

  async function validate() {
      

    await setErrors( () =>{
        var tmp = {};
        if(values.medical_center === ''){
            tmp.medical_center = 'This field is required.';
        }
        if(values.test_date === ''){
            tmp.test_date = 'This field is required.';
        }
        else if(dayjs(values.test_date).isAfter(dayjs())){
            tmp.test_date = 'Time traveler spotted';
        }
        console.log(tmp)
        if(Object.entries(tmp).length === 0){
            setIsNext(true)
        }
        return tmp
    })


  }

  

  const handleNext = () =>{
      validate();
  }


  const insertBT = () =>{
    var json_vals = JSON.stringify(values);
    console.log(json_vals)

    var urlEnd = 'http://localhost:8080/WebApplication1/InsertBloodTest';
    $.ajax({
        url: urlEnd,
        type: "POST",
        contentType: 'json',
        data: json_vals,
        success: function (result) {
          console.log("Success");
            const json = JSON.parse(result)
            console.log(json)

            setValues(json)
            
        },
        error: function (result) {
            console.log(result.responseText)
            var json = JSON.parse(result.responseText)
            console.log(json)

        }
    });
  
  }


  useEffect(() => {
    console.log(errors)
  }, [errors]);
  

  const handleSubmit = () =>{
      console.log(values)
      
      
        setErrors(() =>{
            var tmp = {}
            if(values.blood_sugar ==='' && values.iron ==='' && values.cholesterol ==='' && values.vitamin_b12 ==='' && values.vitamin_d3 ==='' ){
             tmp = {blood_sugar: "Please fill at least one field"};
            }
             if(Object.entries(tmp).length === 0)  insertBT();

             return tmp;
                
        })

      

      
  }




    return (

        <Box 
            background='gray.700' 
            h='530px' 
            p={2} 
            pt={5} 
            w='300px' 
            ml={2} 
            borderRadius='5' 
            display='flex' 
            flexDirection='column'
            alignContent='space-between' 
            justifyContent='space-between' 
        >
{!isNext ?
            <>
            <VStack>
                <Heading fontSize='lg' mb={3}>Submit new blood test</Heading>
                <FormControl isRequired id= "medical_center" isInvalid={errors.medical_center}>
                    <FormLabel>Medical Center</FormLabel>
                    <Input 
                        type= "text" 
                        name= "medical_center"
                        autoComplete= "on"
                        value= {values.medical_center}
                        onChange= {handleChange} 
                        placeholder= "Medical center"
                        minLength="8"
                        />
                        <FormErrorMessage >{errors.medical_center}</FormErrorMessage>
                </FormControl>

                <FormControl isRequired id= "test_date" isInvalid={errors.test_date}>
                    <FormLabel>Test date</FormLabel>
                    <Input 
                        type= "date" 
                        name= "test_date"
                        autoComplete= "on"
                        value= {values.test_date}
                        onChange= {handleChange} 
                        placeholder= "test_date"
                        />
                        <FormErrorMessage >{errors.test_date}</FormErrorMessage>
                </FormControl>
            </VStack>

            <Button onClick={handleNext}>
                Next
            </Button>
            </>

            :

            <>
            <VStack>
                <Heading fontSize='lg' mb={3}>Submit new blood test</Heading>
                <FormControl  id= "blood_sugar" isInvalid={errors.blood_sugar}>
                    <FormLabel>Blood Sugar</FormLabel>
                    <Input 
                        type= "text" 
                        name= "blood_sugar"
                        autoComplete= "on"
                        value= {values.blood_sugar}
                        onChange= {handleChange} 
                        placeholder= "Blood Sugar"
                        />
                        <FormErrorMessage >{errors.blood_sugar}</FormErrorMessage>
                </FormControl>
                <FormControl  id= "cholesterol" >
                    <FormLabel>Cholesterol</FormLabel>
                    <Input 
                        type= "text" 
                        name= "cholesterol"
                        autoComplete= "on"
                        value= {values.cholesterol}
                        onChange= {handleChange} 
                        placeholder= "Cholesterol"
                        />
                </FormControl>
                <FormControl  id= "iron" >
                    <FormLabel>Iron</FormLabel>
                    <Input 
                        type= "text" 
                        name= "iron"
                        autoComplete= "on"
                        value= {values.iron}
                        onChange= {handleChange} 
                        placeholder= "Iron"
                        />
                </FormControl>
                <FormControl  id= "vitamin_d3" >
                    <FormLabel>Vitamin D3</FormLabel>
                    <Input 
                        type= "text" 
                        name= "vitamin_d3"
                        autoComplete= "on"
                        value= {values.vitamin_d3}
                        onChange= {handleChange} 
                        placeholder= "Vitamin D3"
                        />
                </FormControl>
                <FormControl  id= "vitamin_b12" >
                    <FormLabel>Vitamin D12</FormLabel>
                    <Input 
                        type= "text" 
                        name= "vitamin_b12"
                        autoComplete= "on"
                        value= {values.vitamin_b12}
                        onChange= {handleChange} 
                        placeholder= "Vitamin D12"
                        />
                </FormControl>
                
            </VStack>

            <Flex justifyContent='space-between'>
            <Button onClick={() =>{setIsNext(false)}}>
                Back
            </Button>
            <Button colorScheme='teal' onClick={handleSubmit}>
                Submit
            </Button>
            </Flex>
            </>

}

        </Box>
   

    );
};
  
  export default BloodTestForm;