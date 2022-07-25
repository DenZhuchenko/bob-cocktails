import React, {useEffect, useState} from 'react'
import {NavLink, useParams} from "react-router-dom";
import {Box, Button, Image, SimpleGrid} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {getCocktailList, fillUpBasket} from '../../../store/goodsSelectionSlice/index'

const GoodsSelection = () => {
    const data = useSelector(state => state.cocktailList)
    const cocktailList = data.cocktailList
    const basketList = data.basket
    const dispatch = useDispatch()
    let {ingredientName} = useParams()

     console.log('basketList basketList: ', basketList)


    useEffect(() => {
        dispatch(getCocktailList(ingredientName))
    }, [ingredientName])

    // console.log(`basketState: `, basketState)


    const ItemCardCreator = () => {
        return cocktailList.map((el, key) =>
            <Box key={key} m={'25'} maxW='sm' borderColor={'black'} borderWidth='1px' borderRadius='lg'
                 overflow='hidden'>
                <NavLink to={`${el.idDrink}`}>
                    <Image src={el.strDrinkThumb} alt='imageAlt'/>
                </NavLink>
                <Box p='6'>
                    <Box
                        mt='1'
                        fontWeight='bold'
                        as='h2'
                        lineHeight='tight'
                        noOfLines={1}
                        textAlign='center'
                    >
                        {el.strDrink}
                    </Box>

                    <Box textAlign='center'>
                        <Button onClick={() => {
                            console.log('cocktailListbasket cocktailListbasket: ', cocktailList.basket)

                            dispatch( fillUpBasket(
                                    {
                                        name: el.strDrink,
                                        id: el.idDrink,
                                        img: el.strDrinkThumb,
                                        count: 1
                                    }
                                ))
                        }}>
                            Add to Basket</Button>
                    </Box>

                    <Box display='flex' mt='2' alignItems='center'>
                        <Box as='span' ml='2' color='gray.600' fontSize='sm'>

                            {Math.round(Math.random() * 15)} likes
                        </Box>
                    </Box>
                </Box>

            </Box>
        )

    }


    return (
        <SimpleGrid templateColumns='repeat(4, 1fr)' gap={6}>
            <ItemCardCreator/>
        </SimpleGrid>
    )
}

export default GoodsSelection


// {
//     name: cocktailList.strDrink,
//         id: cocktailList.idDrink,
//     img: cocktailList.strDrinkThumb
// }