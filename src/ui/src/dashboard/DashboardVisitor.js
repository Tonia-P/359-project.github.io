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
    Container,
    Grid,
    Heading,
    GridItem,
    Link,
    Icon,
    VStack
  } from '@chakra-ui/react';
  import { BrowserRouter as Router, Routes, Route, Link as ReachLink } from 'react-router-dom'
  
const DashboardVisitor = () => {

    return (
        <Box w='85%' h='90%'>
            <Heading my={3}>Welcome to our site.</Heading>

            <Text my={3}>To continue using the site you need to either  <ReachLink to='/loginMenu'><Link color='teal.500'>login </Link></ReachLink>
            or <Link as={ReachLink} color='teal.500' to='/register'>register.</Link></Text>

            <Text my={3}> Otherwise, you can <Link color='teal.500' as={ReachLink} to='/find_doctor'>browse through the doctors </Link>
            or <Link color='teal.500' href='https://www.pagni.gr/index.php/news/deltia-typou'>read the latest health news(I guess)</Link></Text>
        </Box>
    );
};
  
  export default DashboardVisitor;