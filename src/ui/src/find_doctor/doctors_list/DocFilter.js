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
    Icon
  } from '@chakra-ui/react';
  import DocRow from './DocRow';
  import { SearchIcon } from '@chakra-ui/icons'
  import $ from 'jquery';
  import { BsFilter } from 'react-icons/bs';
  import { MapContext } from '../../contexts/MapContext'



const DocFilter = () => {




    const { allDoctors, filteredDoctors, setFilteredDoctors } = useContext(MapContext)

  
    return (

        <HStack gap={0}>


            <Input placeholder='Basic usage' />

            <Button p={0} ml={0}> <SearchIcon h={5} w={5} /> </Button>

            
            <Menu direction='rtl' zIndex={100}  placement='right'>
  <MenuButton
    p={2}
    pb={1}
    px={3}
    transition='all 0.2s'
    borderRadius='md'
    borderWidth='1px'
    
    
    _hover={{ bg: 'gray.400' }}
    _expanded={{ bg: 'blue.400' }}
    _focus={{ boxShadow: 'outline' }}
  >
    <Icon as={BsFilter} h={5} w={5} />
  </MenuButton>
  <MenuList zIndex={100}>
      <Text pl={3} textAlign='start'>Sort by:</Text>
    <MenuItem _hover={{ bg: 'teal.400' }}>New File</MenuItem>
    <MenuItem _hover={{ bg: 'teal.400' }}>New Window</MenuItem>
  </MenuList>
</Menu>

        </HStack>

    );
  };
  
  export default DocFilter;