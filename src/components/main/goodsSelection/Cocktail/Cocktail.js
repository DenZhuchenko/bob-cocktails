import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import {cocktailAPI} from "../../../../api/cocktailAPI";
import {Box, Image, Spinner} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {createCocktailItem, getCocktailItem} from "../../../../store/goodsSelectionSlice/index";

const Cocktail = () => {

    const currentCocktailInfo = useSelector(state => state.cocktailList.cocktailItem)
    const dispatch = useDispatch()
    const {id} = useParams()


    useEffect(() => {
        dispatch(getCocktailItem(id))
    }, [id])


    const IngredientsList = () => {

        return currentCocktailInfo.ingredients
            ? Object.entries(currentCocktailInfo.ingredients).map(([key, value]) =>
                <Box fontWeight='semibold'
                     key={value + Math.random()}>
                    {` ${value }    ${key}`}
                </Box>
            ) : <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='orange.200'
                color='blue.500'
                size='xl'
            />
    }


    return (
        <>
            <Box m={'25'} maxW='sm' borderColor={'black'} borderWidth='1px' borderRadius='lg' overflow='hidden'>
                <Image src={currentCocktailInfo.img} alt={'imageAlt'}/>
                <Box p='6'>
                    <Box
                        mt='1'
                        fontWeight='bold'
                        as='h2'
                        lineHeight='tight'
                        noOfLines={1}
                        textAlign={'center'}
                    >
                        {currentCocktailInfo.name}
                    </Box>

                    <IngredientsList/>

                    <br/>

                    <Box>
                        {Math.round(Math.random() * 25)}
                        <Box as='span' color='gray.600' fontSize='sm'>
                            $
                        </Box>
                    </Box>

                    <Box display='flex' mt='2' alignItems='center'>
                        <Box as='span' color='gray.600' fontSize='sm'>
                            {Math.round(Math.random() * 15)} reviews
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )

}

export default Cocktail
