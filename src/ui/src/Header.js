import { useState, useEffect, useContext } from 'react';
import { 
    Grid, 
    GridItem, 
    Button,
    Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Box,
  Avatar
    
} from '@chakra-ui/react'
import { Logo } from './Logo';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ColorModeSwitcher } from './ColorModeSwitcher';
import './header.css';
import { UserContext } from './contexts/UserContext';


const Header = () => {

    const [ username, setUsermame ] = useState('');
    const { userInfo, isLogged, setIsLogged } = useContext(UserContext);


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
        setIsLogged(false)
        window.location.reload();

    }

    useEffect(
      () =>{
        setUsermame (read_cookie('username'));
      },[]
    )

    return (

      <Box className='kappa' p={2} borderBottomWidth='0px'  sx={{ position: '-webkit-sticky', /* Safari */ position: 'sticky', top: '0',}}>
        <Grid templateColumns='repeat(12, 1fr)'  align='center' h='30px'>
            <GridItem colSpan={1} h='7' justifySelf="flex-start" />
            <GridItem colSpan={1} h='7' justifySelf="flex-start" >
                <Logo width={ 7} />
            </GridItem>


                
            <GridItem colSpan={5} h='7' justifySelf="flex-start" >
            </GridItem>
            <GridItem colSpan={1} h='7' justifySelf="flex-end" >
            <ColorModeSwitcher size='sm' justifySelf="flex-start" />
            </GridItem>

            {!isLogged ?

            <>

            <GridItem colSpan={1} h='7'  justifySelf="flex-end" >
                
            <Button >
                <Link to="/loginMenu">Login</Link>
            </Button>
            </GridItem>

            <GridItem colSpan={1} h='7'  justifySelf="flex-end" >
            <Button colorScheme='teal'>
                <Link to="/register">Join us</Link>
            </Button>
            </GridItem>
            </>
            :
            <GridItem colSpan={2} h='7'  justifySelf="flex-end" >
                

            <Menu closeOnSelect={true} direction= "rtl">
              <MenuButton   >
              <Avatar name={ userInfo.firstname } size='sm' src='https://bit.ly/tioluwani-kolawole' />
              </MenuButton>
              <MenuList minWidth='240px'>
              <Link to="/dashboard"><MenuItem>Dashboard</MenuItem></Link>
              <Link to="/profile"><MenuItem>Profile</MenuItem></Link>
              {username === 'admin' && <Link to="/Certify"><MenuItem>Certify Doctors</MenuItem></Link>}
              {userInfo.usertype !== 'admin' && <Link to="/Messages"><MenuItem>Messages</MenuItem></Link>}
              {userInfo.usertype === 'doctor' && <Link to="/Rendezvous"><MenuItem>Rendezvous</MenuItem></Link>}
              {userInfo.usertype === 'user' && <Link to="/find_doctor"><MenuItem>Find doctor</MenuItem></Link>}
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