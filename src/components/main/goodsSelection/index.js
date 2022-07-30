import React, {useEffect, useState} from 'react'
import {NavLink, useParams} from "react-router-dom";
import {Box, Button, IconButton, Image, SimpleGrid} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {getCocktailList, fillUpBasket} from '../../../store/goodsSelectionSlice/index'
import {CheckCircleIcon, SmallCloseIcon} from '@chakra-ui/icons'


const GoodsSelection = () => {
    const data = useSelector(state => state.cocktailList)
    const cocktailList = data.cocktailList
    const basket = data.basket
    const dispatch = useDispatch()
    const {ingredientName} = useParams()



    useEffect(() => {
        dispatch(getCocktailList(ingredientName))
    }, [ingredientName])




    const CardButton = (props) => {
        const {info} = props
        const {idDrink, strDrink, strDrinkThumb } = info

        const existInBasket = basket.find(product => product.id === idDrink)

        return (
            <> {
                existInBasket
                    ? <NavLink to={'/basket'}>
                        <IconButton
                            p={'1rem'}
                            bg={'green.200'}
                            aria-label="More server options"
                            variant="solid"
                            w="fit-content"
                            icon={<CheckCircleIcon/>}
                        />
                    </NavLink>
                    : <Button onClick={() => {

                        dispatch(fillUpBasket(
                            {
                                name: strDrink,
                                id: idDrink,
                                img: strDrinkThumb,
                                count: 1
                            }
                        ))
                    }}
                    >
                        Add to Basket</Button>
            }
            </>
        )
    }







    const ItemCardCreator = () => {
        return cocktailList.map((el, key) =>
            <Box key={key} m={'25'} maxW='sm' borderColor={'black'} borderWidth='1px' borderRadius='lg'
                 overflow='hidden'>
                <NavLink to={`${el.idDrink}`}>
                    <Image src={el.strDrinkThumb} alt='imageAlt'/>
                </NavLink>


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
                    <CardButton info={el}/>
                </Box>

                <Box display='flex' mt='2' alignItems='center'>
                    <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                        {el.idDrink
                            ? el.idDrink.substring(0, 2) - 7
                            : null
                        } $
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


