import React from 'react'
import Header from "../../header";
import Footer from "../../footer";
import {Box, Grid, GridItem, useColorModeValue} from "@chakra-ui/react";
import {Outlet} from 'react-router'

const AppLayout = () => {
    return (

        <Box>
            <Grid templateAreas={`
                  "header header"
                  "main main"`}
                  // gridTemplateRows={'4rem 1fr 30px'}
                  // gridTemplateColumns={'15rem 1fr'}
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

                {/*<GridItem*/}
                {/*    bg='orange.300'*/}
                {/*    area={'footer'}>*/}
                {/*</GridItem>*/}
            </Grid>
        </Box>
    )
}

export default AppLayout


// <>
// <Grid templateAreas={`
//                   "header header"
//                   "nav main"
//                   "footer footer"`}
// gridTemplateRows={'45px 1fr 30px'}
// gridTemplateColumns={'350px 1fr'}
// gap='1'
// color='blackAlpha.700'
// fontWeight='bold'
//     >
//
//     <GridItem
// pl='25'
// bg='orange.300'
// area={'header'}
// justifyContent={'space-evenly'}
//     >
//     <Header/>
//     </GridItem>
//
// <GridItem
//     alignItems={'center'}
//     pl='2'
//     bg='pink.300'
//     area='nav'
//     maxHeight='90vh'
//     overflow='auto'
//
// >
//     <NavBar/>
// </GridItem>
//
//
// <GridItem
//     pl='2'
//     bg='orange.100'
//     area={'main'}
//     maxHeight='90vh'
//     overflow='auto'
// >
//
//
//
//     <Outlet/>
// </GridItem>
// <GridItem
//     pl='2'
//     bg='orange.300'
//     area={'footer'}>
//     <Footer/>
// </GridItem>
// </Grid>
// </>