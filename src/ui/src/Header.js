import { useState, useEffect } from 'react';
import { 
    Grid, 
    GridItem, 
    Stack,
    Button,
    Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Box,
  Avatar
    
} from '@chakra-ui/react'
import { Logo } from './Logo';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ColorModeSwitcher } from './ColorModeSwitcher';
import './header.css';


const Header = (isLogged) => {

    const [ username, setUsermame ] = useState('');

    function read_cookie(name) {
        var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
        if(result) return result[1];
        else return null;
    }


    const handleLogout = () => {
        var cookie_user = "username = ; expires=Thu, 18 Dec 1999 12:00:00 UTC; path=/";
        var cookie_pass = "password = ; expires=Thu, 18 Dec 1999 12:00:00 UTC; path=/";

        document.cookie = cookie_user;
        document.cookie = cookie_pass;
        window.location.reload();
    }

    useEffect(
      () =>{
        setUsermame (read_cookie('username'));
      },[]
    )

    return (

      <Box className='kappa' p={3} borderBottomWidth='2px' sx={{ position: '-webkit-sticky', /* Safari */ position: 'sticky', top: '0',}}>
        <Grid templateColumns='repeat(12, 1fr)' align='center' >
            <GridItem colSpan={1} h='10' justifySelf="flex-start" />
            <GridItem colSpan={1} h='10' justifySelf="flex-start" >
                <Logo width={ 10} />
            </GridItem>


                
            <GridItem colSpan={5} h='10' justifySelf="flex-start" >
            <Button colorScheme='teal'>
                    <Link to="/bloodtest">Blood test</Link>
                </Button>
            </GridItem>
            <GridItem colSpan={1} h='10' justifySelf="flex-end" >
            <ColorModeSwitcher  justifySelf="flex-start" />
            </GridItem>

            {!isLogged.isLogged ?

            <>

            <GridItem colSpan={1} h='10'  justifySelf="flex-end" >
                
            <Button >
                <Link to="/loginMenu">Login</Link>
            </Button>
            </GridItem>

            <GridItem colSpan={1} h='10'  justifySelf="flex-end" >
            <Button colorScheme='teal'>
                <Link to="/register">Join us</Link>
            </Button>
            </GridItem>
            </>
            :
            <GridItem colSpan={2} h='10'  justifySelf="flex-end" >
                

            <Menu closeOnSelect={true} direction= "rtl">
              <MenuButton  colorScheme='blue' >
              <Avatar name={ username } size='md' src='https://bit.ly/tioluwani-kolawole' />
              </MenuButton>
              <MenuList minWidth='240px'>
              <Link to="/dashboard"><MenuItem>Dashboard</MenuItem></Link>
              <Link to="/profile"><MenuItem>Profile</MenuItem></Link>
              <Link to="/Users"><MenuItem>User List</MenuItem></Link>
              <Link to="/Certify"><MenuItem>Certify Doctors</MenuItem></Link>
              <MenuDivider />
                <MenuItem onClick={handleLogout}><Link to="/">Logout</Link></MenuItem>
                
              </MenuList>
            </Menu>
            
            </GridItem>
}

            <GridItem colSpan={1} h='10' justifySelf="flex-start" />
        </Grid>
        </Box>
    );
}

export default Header;