import React from 'react'
import {Box, Flex, HStack, Img, useColorModeValue, VStack} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import BasketItem from "./basketItem";
import SumPrice from "./sumPrise";
import emptyIco from './../../../assets/modal-cart-dummy.svg'


const Basket = () => {

    const basketItems = useSelector(state => state.basket.basket)


    return (
        <Flex
              minH='90vh'
              align='center'
              justify='center'
              bg={useColorModeValue('orange.200', 'gray.800')}
              color={useColorModeValue('gray.600', 'gray.800')}
        >
            <HStack>
            <Box
                position={"absolute"}
                top={"10rem"}
                bottom={"5rem"}
                w='50rem'
                rounded='md'
                left={"50%"}
                transform={'translateX(-50%)'}
                boxShadow={"0px 4px 15px rgba(0, 0, 0, 0.15)"}
                bg={useColorModeValue('white', 'gray.600')}
                color={useColorModeValue('gray.700', 'white')}
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
                <VStack
                >
                    {
                        basketItems.length > 0
                            ? <>

                                    <BasketItem
                                        basketItems={basketItems}/>

                            </>
                            : <div>

                            <Img pt={'10rem'} src={emptyIco} alt={'emptyBasket'}/>
                                Basket is currently empty
                            </div>
                    }
                    {/*<div><SumPrice/></div>*/}
                </VStack>
            </Box>
            <Box pl={'100rem'}><SumPrice/></Box>
            </HStack>
        </Flex>
    )
}

export default Basket


