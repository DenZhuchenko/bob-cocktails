import React, {useEffect, useState} from 'react'
import {Box, Button, Flex, HStack, Img, Text, VStack} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {decrementProductInBasket, incrementProductInBasket} from "../../../store/goodsSelectionSlice";


const Basket = () => {

    const basketItems = useSelector(state => state.cocktailList.basket)
    const dispatch = useDispatch()


    const sumPricePerItemHandler = (count, pricePerItem) => {
        const price = pricePerItem.substring(0, 2) - 7 //Getting at least smt, what we can use as price
        const sum = count * (price)
        const correct = sum % count === 0 && sum > 0
        console.log(`correct: `, correct)
        if (correct) {
            return sum + `$`
        } else return <div>
            Error, smt strange was occurred
        </div>


    }

    const SumPrise = () => {
        if (basketItems) {
            let sumArr = basketItems.map(el =>
                el.count * (el.id.substring(0, 2) - 7)
            )
            return <div>Total: {sumArr.reduce((sum, elem) => sum + elem, 0)}$</div>
        } else return <div>Error</div>


    }

    const increment = (count, id) => {
        dispatch(incrementProductInBasket({count, id}))
    }
    const decrement = (count, id) => {
        dispatch(decrementProductInBasket({count, id}))
    }

    const ItemList = () => {

        return (<>
                <Flex>
                    <HStack>
                        <Box>
                            {basketItems.map((item) =>

                                <Box key={item.id + Math.random()}
                                     display={'flex'}
                                     border={'1px solid black'}
                                     borderRadius={'5px'}
                                     boxSizing={'border-box'}
                                     justifyContent={'space-between'}
                                     p={'1em'}
                                     m={'1em'}
                                     w='55vh'
                                >
                                    <Img src={item.image} alt={`product + ${item.name}`} height={'100px'}
                                         width={'100px'}/>
                                    {item.name}
                                    <div>
                                        Price:
                                        {item.id.substring(0, 2) - 7}$
                                    </div>
                                    <br/>
                                    <div>
                                        Count: {item.count}
                                        <br/>


                                        {item.count > 1
                                            ? <Button
                                                onClick={() => {
                                                    decrement(item.count, item.id)
                                                }}
                                            >
                                                -
                                            </Button>
                                            : <Button
                                                disabled='disable'
                                            >
                                                -
                                            </Button>
                                        }
                                        <Button
                                            onClick={() => {
                                                increment(item.count, item.id)
                                            }}
                                        >
                                            +
                                        </Button>


                                    </div>

                                    <Text>Sum Price {
                                        sumPricePerItemHandler(item.count, item.id)
                                    }</Text>
                                </Box>
                            )}
                            <div><SumPrise/></div>

                            <div>
                            </div>
                        </Box>
                    </HStack>
                </Flex>
            </>
        )
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
                            ? <ItemList/>
                            : <div>
                                Basket is currently empty
                            </div>
                    }
                </VStack>

            </Box>
        </Flex>
    )
}

export default Basket
