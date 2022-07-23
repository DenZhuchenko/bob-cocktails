import React, {useState} from 'react'
import {Box, Flex} from "@chakra-ui/react";


const Basket = () => {


    let order = JSON.parse(localStorage.getItem('order'))








    const [priceSum, setPriseSum] = useState(null)

    const randomPriceGenerator = () =>{
       return  Math.round(Math.random()*15)
    }




    return (
        <Flex minH='90vh'
              align='center'
              justify='center'>
            <Box
                h='60vh'
                w='40vh'
                bg='white'
                rounded='md'
            >
                Basket
                <br/>
                <br/>
                <br/>

                { order
                    ? Object.entries(order).map(([key, value]) =>
                        <div key={value}>
                            {`${key}   - ${value.substring(0, 2) - 7}$ `}
                        </div>
                    )
                    : <div>
                        Empty Basket
                    </div>
                }
            </Box>
        </Flex>
    )
}

export default Basket
