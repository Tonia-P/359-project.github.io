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
    Modal,
    ModalHeader,
    ModalOverlay,
    ModalCloseButton,
    ModalBody,
    ModalContent,
    ModalFooter,
    Flex,
    useDisclosure,
    Grid,
    Select
  } from '@chakra-ui/react';
  import { UserContext } from '../../contexts/UserContext';

  import dayjs from 'dayjs';
  import $ from 'jquery';


  
const BloodDonation = () => {


  const { userInfo } = useContext(UserContext);
  const { isOpen: isDocOpen, onOpen: onDocOpen, onClose: onDocClose } = useDisclosure()
  const { isOpen: isUserOpen, onOpen: onUserOpen, onClose: onUserClose  } = useDisclosure()
  const [ bloodVals, setBloodVals ] = useState({
      doctor_id: userInfo.doctor_id,
      bloodtype: '' 
  })


  const handleChange = e => {
    const { name, value } = e.target;
    setBloodVals({
      ...bloodVals,
      bloodtype: value
    });
    console.log(bloodVals);
  };



  useEffect(() => {

    if(!isDocOpen){
        setBloodVals({
            ...bloodVals,
            bloodtype: ''
          });
    }
  }, [isDocOpen]);
  

  const handleClick = () =>{
      console.log(bloodVals)
  }

  const handleSubmit = () =>{
    var json_vals = JSON.stringify(bloodVals);
    console.log(bloodVals)
    
        var urlEnd = 'http://localhost:8080/WebApplication1/BloodDonationMessage';
        $.ajax({
            url: urlEnd,
            type: "POST",
            contentType: 'json',
            data: json_vals,
            success: function (result) {
              console.log("Success");
                const json = JSON.parse(result)
                console.log(json)

                
            },
            error: function (result) {
                console.log(result.responseText)
                var json = JSON.parse(result.responseText)
                console.log(json)

            }
        });
  }



    return (

        <>

        <Box background='tomato' h='100%' borderRadius='5' overflow='hidden'>
            <Flex h='100%' justifyContent="space-between" mx={3} alignItems='center'>
                <Text color='white'>Blood Donation</Text>
                <Button colorScheme='none' background='white' color='tomato' variant='solid' onClick={userInfo.specialty ? onDocOpen : onUserOpen}>
                  {userInfo.specialty ? 'Invite' : 'Learn where'}
                  </Button>
            </Flex>
        </Box>





        <Modal isOpen={isDocOpen} onClose={onDocClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Blood donation month</ModalHeader>
          <ModalCloseButton />
          
          <>
          <ModalBody>

              
              
              <Text mb={3}>Select the blood type that is most needed in your hospital and invite your patients to
                  donate.
              </Text>

            <Select placeholder='Select option' onChange={handleChange} name='bloodtype' isRequired >
                <option value='A+'>A+</option>
                <option value='A-'>A-</option>
                <option value='B+'>B+</option>
                <option value='B-'>B-</option>
                <option value='AB+'>AB+</option>
                <option value='AB-'>AB-</option>
                <option value='O+'>O+</option>
                <option value='O-'>O-</option>
            </Select>

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' variant='ghost' mr={3} onClick={onDocClose}>
              Close
            </Button>

            {bloodVals.bloodtype === '' ?
            <Button colorScheme='teal' isDisabled onClick={handleClick}>
                Submit
            </Button>
            :
            <Button colorScheme='teal' onClick={handleSubmit}>
                Submit
            </Button>
            
}
          </ModalFooter>
          </>





        </ModalContent>
      </Modal>
















      <Modal isOpen={isUserOpen} onClose={onUserClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Blood donation month</ModalHeader>
          <ModalCloseButton />
          
          <>
          <ModalBody>

              
              
              <Text mb={3}>You can donate blood in the following places:
              </Text>

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' variant='ghost' mr={3} onClick={onUserClose}>
              Close
            </Button>

            {bloodVals.bloodtype === '' ?
            <Button colorScheme='teal' isDisabled onClick={handleClick}>
                Submit
            </Button>
            :
            <Button colorScheme='teal' onClick={handleClick}>
                Submit
            </Button>
            
}
          </ModalFooter>
          </>





        </ModalContent>
      </Modal>


        </>
   

    );
};
  
  export default BloodDonation;