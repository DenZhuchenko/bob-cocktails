import React from 'react'
import {Box, Flex, VStack} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import BasketItem from "./basketItem";
import SumPrise from "./sumPrise";
import SumPrice from "./sumPrise";


const Basket = () => {

    const basketItems = useSelector(state => state.basket.basket)
    const sumPrice = useSelector(state => state.basket.sumPrice)


    return (
        <Flex minH='90vh'
              align='center'
              justify='center'
        >
            <Box
                h='80vh'
                w='70vh'
                bg='white'
                rounded='md'
                overflow={'auto'}
            >
                <VStack>
                    {
                        basketItems.length > 0
                            ? <ul>
                                <BasketItem
                                    basketItems={basketItems}/>
                            </ul>
                            : <div>
                                Basket is currently empty
                            </div>
                    }
                    <div><SumPrice/></div>
                </VStack>
            </Box>
        </Flex>
    )
}

export default Basket


