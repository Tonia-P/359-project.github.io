
import { 
    Grid, 
    GridItem, 
    Stack
    
} from '@chakra-ui/react'
import { Logo } from './Logo';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import LoginOptions from './landing/LoginOptions';


const Header = () => {

    return (

        <Stack>
        <Grid templateColumns='repeat(12, 1fr)' align='center' >
            <GridItem colSpan={1} h='10' justifySelf="flex-start" />
            <GridItem colSpan={5} h='10' justifySelf="flex-start" >
                <Logo width={ 10} />
            </GridItem>

            <GridItem colSpan={3} h='10' justifySelf="flex-end" >
            <ColorModeSwitcher  justifySelf="flex-start" />
            </GridItem>

            <GridItem colSpan={2} h='10'  justifySelf="flex-end" >
                
                <LoginOptions />

            </GridItem>
            <GridItem colSpan={1} h='10' justifySelf="flex-start" />
        </Grid>
        </Stack>
    );
}

export default Header;