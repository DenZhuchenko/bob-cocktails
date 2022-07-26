import React, {useState} from 'react'
import {Box, Button, Flex, HStack, Img, Text, VStack} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {decrementProductInBasket, incrementProductInBasket} from "../../../store/goodsSelectionSlice";


const Basket = () => {

    const basketItems = useSelector(state => state.cocktailList.basket)
    const dispatch = useDispatch()


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
                                    <Img src={item.image} alt={`procuct + ${item.name}`} height={'100px'}
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
                                        <Button
                                            onClick={()=>{increment(item.count, item.id)}}
                                        >
                                            +
                                        </Button>

                                        { item.count > 1
                                            ? <Button
                                                onClick={() =>{decrement(item.count, item.id)}}
                                            >
                                                -
                                            </Button>
                                            : <Button
                                                disabled={'disable'}
                                            >
                                                -
                                            </Button>
                                        }
                                    </div>
                                    <Text>Summ Price {item.count*(item.id.substring(0, 2) - 7)}</Text>
                                </Box>
                            )}
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
