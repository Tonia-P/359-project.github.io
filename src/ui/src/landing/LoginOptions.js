import { 
    Button,
    Stack ,
    Text
} from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Form from '../register/Form';
import LoginForm from './LoginForm';





const LoginOptions = () =>{

    return(
        <>
            <Button >
                <Link to="/login">Login</Link>
            </Button>
            <Button colorScheme='teal'>
                <Link to="/register">Join us</Link>
            </Button>
        </>
        
    );
}

export default LoginOptions;