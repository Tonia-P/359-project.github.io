
import { 
    Grid, 
    GridItem, 
    Stack,
    Button
    
} from '@chakra-ui/react'
import { Logo } from './Logo';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ColorModeSwitcher } from './ColorModeSwitcher';


const Header = (isLogged) => {


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
            </GridItem>
}

            <GridItem colSpan={1} h='10' justifySelf="flex-start" />
        </Grid>
        </Stack>
    );
}

export default Header;