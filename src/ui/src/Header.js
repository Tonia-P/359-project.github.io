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
  Avatar
    
} from '@chakra-ui/react'
import { Logo } from './Logo';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ColorModeSwitcher } from './ColorModeSwitcher';


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

    return (

        <Stack>
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
                <Link to="/login">Login</Link>
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
                
            <Button onClick={handleLogout} >
                <Link to="/">Logout</Link>
            </Button>

            <Avatar name='Kola Tioluwani' src='https://bit.ly/tioluwani-kolawole' />

            <Menu closeOnSelect={false}>
              <MenuButton as={Button} colorScheme='blue'>
                MenuItem
              </MenuButton>
              <MenuList minWidth='240px'>
                <MenuOptionGroup defaultValue='asc' title='Order' type='radio'>
                  <MenuItemOption value='asc'>Ascending</MenuItemOption>
                  <MenuItemOption value='desc'>Descending</MenuItemOption>
                </MenuOptionGroup>
                <MenuDivider />
                <MenuOptionGroup title='Country' type='checkbox'>
                  <MenuItemOption value='email'>Email</MenuItemOption>
                  <MenuItemOption value='phone'>Phone</MenuItemOption>
                  <MenuItemOption value='country'>Country</MenuItemOption>
                </MenuOptionGroup>
              </MenuList>
            </Menu>
            
            </GridItem>
}

            <GridItem colSpan={1} h='10' justifySelf="flex-start" />
        </Grid>
        </Stack>
    );
}

export default Header;