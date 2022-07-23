import React from 'react'
import Header from "../../header";
import Footer from "../../footer";
import {Grid, GridItem} from "@chakra-ui/react";
import {Outlet} from 'react-router'
import NavBar from "../../main/navBar";

const AppLayout = (props) => {
    const {login} = props

    // console.log('login from appLayout: ', login )

    return (

        <>
            <Grid templateAreas={`
                  "header header"
                  "main main"
                  "footer footer"`}
                  gridTemplateRows={'45px 1fr 30px'}
                  gridTemplateColumns={'350px 1fr'}
                  color='blackAlpha.700'
                  fontWeight='bold'
            >
                <GridItem
                    // pl='25'
                    // bg='orange.300'
                    area={'header'}
                    // justifyContent={'space-evenly'}
                >
                    <Header login={login}/>
                </GridItem>

                <GridItem
                    bg='orange.100'
                    area={'main'}
                    maxHeight='90vh'
                    overflow='auto'
                >

                    <Outlet/>

                </GridItem>

                <GridItem
                    pl='2'
                    bg='orange.300'
                    area={'footer'}>
                    <Footer/>
                </GridItem>
            </Grid>
        </>
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