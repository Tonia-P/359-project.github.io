import React, { useState, useEffect, useContext } from 'react';
import {
    Text,
    SimpleGrid,
    Spinner,
    Box,
    Input,
    HStack,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    MenuOptionGroup,
    MenuItemOption,
    Icon
  } from '@chakra-ui/react';
  import DocRow from './DocRow';
  import { SearchIcon } from '@chakra-ui/icons'
  import $ from 'jquery';
  import { BsFilter } from 'react-icons/bs';
  import { MapContext } from '../../contexts/MapContext'
  import { AiFillCar } from 'react-icons/ai';


const DocFilter = () => {




    const { allDoctors, filteredDoctors, setFilteredDoctors } = useContext(MapContext)


    const sortArray = type => {
      const docs = [...filteredDoctors]
      const types = {
        distance: 'distance',
        duration: 'duration',
        lname: 'lname',
      };
      const sortProperty = types[type];
      console.log(type)
      var sorted = docs.sort((a, b) => a[sortProperty] - b[sortProperty]);
      if(sortProperty == 'lname') {
        console.log('lllllll')
        sorted = docs.sort((a, b) => (a.lname > b.lname) ? 1 : -1);
      }
      console.log(sorted);
      setFilteredDoctors(sorted);
    };


    return (

        <HStack gap={0}>


            <Input placeholder='Search' />


            
            <Menu direction='rtl' zIndex={100}  placement='right' offset='[50,0]' >
  <MenuButton
    p={2}
    pb={1}
    px={3}
    transition='all 0.2s'
    borderRadius='md'
    borderWidth='1px'
    
    
    _hover={{ bg: 'teal.700' }}
    _expanded={{ bg: 'teal.500' }}
    _focus={{ boxShadow: 'outline' }}
  >
    <Icon as={BsFilter} h={5} w={5} />
  </MenuButton>
  <MenuList zIndex={100}>
    <MenuOptionGroup onChange={(e) => sortArray(e)} defaultValue='lname' title='Sort by' textAlign='start' type='radio'>
      <MenuItemOption fontSize='md' value='lname'>Alphabeticaly</MenuItemOption>
      <MenuItemOption fontSize='md' value='distance'>Distance</MenuItemOption>
      <MenuItemOption fontSize='md' value='duration'>Duration</MenuItemOption>
    </MenuOptionGroup>
  </MenuList>
</Menu>

        </HStack>

    );
  };
  
  export default DocFilter;