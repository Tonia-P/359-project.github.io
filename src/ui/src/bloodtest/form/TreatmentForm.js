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


  
const TreatmentForm = ({ params }) => {

  const { userInfo } = useContext(UserContext);

  const [ values, setValues ] = useState({
        doctor_id: userInfo.doctor_id,
        user_id: params.user_id,
        start_date: '',
        end_date: '',
        treatment_text: ''
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
        if(values.treatment_text === ''){
            tmp.medical_center = 'This field is required.';
        }
        if(values.start_date === ''){
            tmp.test_date = 'This field is required.';
        }
        else if(dayjs(values.start_date).isAfter(dayjs())){
            tmp.test_date = 'Time traveler spotted';
        }
        console.log(tmp)
        if(Object.entries(tmp).length === 0){
            insertBT()
        }
        return tmp
    })


  }

  

  const handleNext = () =>{
      validate();
  }


  const insertBT = () =>{
    let o = Object.fromEntries(Object.entries(values).filter(([_, v]) => v != ''));
    var json_vals = JSON.stringify(o);
    console.log(json_vals)

    var urlEnd = 'http://localhost:8080/WebApplication1/InsertTreatment';
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
            <>
            <VStack>
                <Heading fontSize='lg' mb={3}>Submit new treatment</Heading>
                <FormControl isRequired id= "treatment_text" isInvalid={errors.medical_center}>
                    <FormLabel>Treatment text</FormLabel>
                    <Input 
                        type= "text" 
                        name= "treatment_text"
                        value= {values.treatment_text}
                        onChange= {handleChange} 
                        placeholder= "text"
                        minLength="8"
                        />
                        <FormErrorMessage >{errors.treatment_text}</FormErrorMessage>
                </FormControl>

                <FormControl isRequired id= "start_date" isInvalid={errors.test_date}>
                    <FormLabel>Start date</FormLabel>
                    <Input 
                        type= "date" 
                        name= "start_date"
                        value= {values.start_date}
                        onChange= {handleChange} 
                        placeholder= "start_date"
                        />
                        <FormErrorMessage >{errors.start_date}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired id= "end_date" isInvalid={errors.test_date}>
                    <FormLabel>End date</FormLabel>
                    <Input 
                        type= "date" 
                        name= "end_date"
                        value= {values.end_date}
                        onChange= {handleChange} 
                        placeholder= "end_date"
                        />
                        <FormErrorMessage >{errors.end_date}</FormErrorMessage>
                </FormControl>
            </VStack>

            <Button onClick={handleNext} >
                Submit
            </Button>
            </>

        </Box>
   

    );
};
  
  export default TreatmentForm;