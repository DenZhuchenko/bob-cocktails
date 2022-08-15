import React from 'react'
import {Box, Flex, useColorModeValue, VStack} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import BasketItem from "./basketItem";
import SumPrice from "./sumPrise";


const Basket = () => {

    const basketItems = useSelector(state => state.basket.basket)


    return (
        <Flex minH='90vh'
              align='center'
              justify='center'
              bg={useColorModeValue('orange.200', 'gray.800')}
              color={useColorModeValue('gray.600', 'gray.800')}
        >
            <Box
                position={"absolute"}
                top={"10rem"}
                bottom={"10rem"}
                w='40rem'
                bg='white'
                rounded='md'
                left={"50%"}
                transform={'translateX(-50%)'}
                boxShadow={"0px 4px 15px rgba(0, 0, 0, 0.15)"}
                overflow={'auto'}
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
                <VStack >
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


