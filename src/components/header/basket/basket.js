import React, {useEffect, useState} from 'react'
import {Box, Button, Flex, HStack, Img, Text, VStack} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {decrementProductInBasket, incrementProductInBasket, removeBasketItem} from "../../../store/goodsSelectionSlice";
import BasketItem from "./basketItem";


const Basket = () => {

    const basketItems = useSelector(state => state.cocktailList.basket)


    const SumPrise = () => {

        if (basketItems) {
            let sumArr = basketItems.map(el =>
                el.count * (el.id.substring(0, 2) - 7)
            )
            return <Box
                border={"2px solid green"}
                borderRadius={'5px'}
                p={'25px'}
            >
                Total:  
                {sumArr.reduce((sum, elem) => sum + elem, 0)}$
            </Box>
        } else return <div>Error</div>


    }



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
                    <div><SumPrise/></div>
                </VStack>
            </Box>
        </Flex>
    )
}

export default Basket


