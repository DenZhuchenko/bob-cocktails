import React from 'react'
import Header from "../../header";
import {Box, Grid, GridItem, useColorModeValue} from "@chakra-ui/react";
import {Outlet} from 'react-router'

const AppLayout = () => {
    return (

        <Box>
            <Grid templateAreas={`
                  "header header"
                  "main main"`}
                  color='blackAlpha.700'
                  bg={useColorModeValue('orange.200', 'gray.800')}
                  fontWeight='bold'
            >
                <GridItem
                    h={'7vh'}
                    area={'header'}
                >
                    <Header/>
                </GridItem>

                <GridItem
                    bg={useColorModeValue('orange.200', 'gray.800')}
                    area={'main'}
                    overflow='auto'
                >
                    <Outlet/>
                </GridItem>


            </Grid>
        </Box>
    )
}

export default AppLayout


