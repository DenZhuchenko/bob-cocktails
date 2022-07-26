import React, {useState} from 'react'
import {Box, Flex, HStack, Img, VStack} from "@chakra-ui/react";
import {useSelector} from "react-redux";


const Basket = () => {

    const basketItems = useSelector(state => state.cocktailList.basket)
    let order = JSON.parse(localStorage.getItem('order'))

    const ItemList = () => {

        return (<>
                <Flex>
                    <HStack>
                        <Box>
                            {basketItems.map((item, key) =>

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
                w='60vh'
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
