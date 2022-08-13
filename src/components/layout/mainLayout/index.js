import React from "react";
import NavBar from "../../main/navBar";
import {Grid, GridItem, useColorModeValue} from "@chakra-ui/react";
import {Outlet} from "react-router";

const MainLayout = () =>{

    return(
        <Grid templateAreas={`
        "nav main"`}
              gridTemplateRows={'45px 1fr 30px'}
              gridTemplateColumns={'350px 1fr'}
              gap='1'
              bg={useColorModeValue('gray.100', 'gray.800')}
              color={useColorModeValue('gray.600', 'gray.100')}
              fontWeight='bold'
              minH={'90vh'}
        >
            <GridItem
                    alignItems={'center'}
                    area='nav'
                    h='100vh'
                    overflow='auto'

            >
                <NavBar/>
            </GridItem>

            <GridItem
                pl='2'
                bg='orange.100'
                area={'main'}
                minH='100vh'
                overflow='auto'
                bg={useColorModeValue('gray.100', 'gray.800')}
                color={useColorModeValue('gray.600', 'gray.100')}
            >

                <Outlet/>

            </GridItem>
        </Grid>
    )
}

export default MainLayout