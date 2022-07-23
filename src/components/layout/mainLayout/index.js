import React from "react";
import NavBar from "../../main/navBar";
import {Grid, GridItem} from "@chakra-ui/react";
import {Outlet} from "react-router";

const MainLayout = (props) =>{

    return(
        <Grid templateAreas={`
        "nav main"`}
              gridTemplateRows={'45px 1fr 30px'}
              gridTemplateColumns={'350px 1fr'}
              gap='1'
              color='blackAlpha.700'
              fontWeight='bold'
              minH={'90vh'}
        >
            <GridItem
                    alignItems={'center'}
                    bg='orange.300'
                    area='nav'
                    minH='90vh'
                    overflow='auto'
            >
                <NavBar/>
            </GridItem>

            <GridItem
                pl='2'
                bg='orange.100'
                area={'main'}
                minH='90vh'
                overflow='auto'
            >

                <Outlet/>

            </GridItem>
        </Grid>
    )
}

export default MainLayout