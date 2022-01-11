import { 
    Grid,
    Stack,
    Button,
    
} from '@chakra-ui/react'
import { 
    BrowserRouter as 
    Link,
    Outlet
} from 'react-router-dom';


const BloodTestMenu = () =>{

    return (
        <Stack>

            <Grid templateColumns='repeat(5, 1fr)' gap={6}>
                <Button>
                    <Link to="/bloodtest/allbloodtests">All blood tests</Link>
                </Button>
                <Button>
                    <Link to="/bloodtest/new">Add blood test</Link>
                </Button>
            </Grid>



            <Outlet />
        </Stack>
    )
}

export default BloodTestMenu;