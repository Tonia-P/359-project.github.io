import { 
    Button,
    Stack,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    Text,
    VStack,
    Grid
} from '@chakra-ui/react'
import LoginControl from './LoginControl';







const LoginForm = ({ submitForm }) =>{

    const { handleChange, handleSubmit, values, errors, isSubmitting } = LoginControl(
        submitForm
    );

    return(
    <Grid minH="100vh" p={3}>
    <VStack spacing={8}>
        <form method= "POST" onSubmit={handleSubmit} noValidate>


            <Stack spacing= '40px' width='500px'>
            <Text fontSize='5xl' >Login</Text>
            <FormControl isRequired id= "username">
                <FormLabel>Username</FormLabel>
                <Input 
                    type= "text" 
                    name= "username"
                    autoComplete= "on"
                    value= {values.username}
                    onChange= {handleChange} 
                    placeholder= "Username"
                    minLength="8"
                    />
            </FormControl>

            <FormControl isRequired id= "password" >
                <FormLabel>Password</FormLabel>
                <InputGroup>
                <Input 
                    type= "password" 
                    name= "password"
                    autoComplete= "off"
                    value= {values.password}
                    onChange= {handleChange} 
                    placeholder= "Password"
                    />
                </InputGroup>
            </FormControl>

            <Text>{ errors.error }</Text>
            
            {isSubmitting ? 
            <Button
                mt={2}
                colorScheme="teal"
                type="submit"
                isLoading
            >
                Submit
            </Button>
            :
            <Button
                mt={2}
                colorScheme="teal"
                type="submit"
            >
                Submit
            </Button>

}
            </Stack>

        </form>
</VStack>
        </Grid>
        
        
    );
}

export default LoginForm;