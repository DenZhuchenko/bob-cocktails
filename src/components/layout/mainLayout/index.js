import React from "react";
import NavBar from "../../main/navBar";
import {Grid, GridItem, useColorModeValue} from "@chakra-ui/react";
import {Outlet} from "react-router";

const MainLayout = () =>{

    return(
        <Grid templateAreas={`
        "nav main"`}
              // gridTemplateRows={'45px 1fr 30px'}
              gridTemplateColumns={'350px 1fr'}
              gap='1'
              bg={useColorModeValue('orange.200', 'gray.800')}
              color={useColorModeValue('gray.600', 'gray.100')}
              fontWeight='bold'
              h={'93vh'}

        >
            <GridItem
                    alignItems={'center'}
                    area='nav'
                    overflow='auto'

                    css={{
                        '&::-webkit-scrollbar': {
                            width: '4px',
                        },
                        '&::-webkit-scrollbar-track': {
                            width: '6px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: 'grey',
                            borderRadius: '24px',
                        },
                    }}

            >
                <NavBar/>
            </GridItem>

            <GridItem
                pl='2'
                area={'main'}
                overflow='auto'

                bg={useColorModeValue('orange.200', 'gray.800')}
                color={useColorModeValue('gray.700', 'gray.100')}
                css={{
                    '&::-webkit-scrollbar': {
                        width: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: 'grey',
                        borderRadius: '24px',
                    },
                }}
            >

                <Outlet/>

            </GridItem>
        </Grid>
    )
}

export default MainLayout