import React, {useEffect, useState} from 'react'
import {NavLink, useParams} from "react-router-dom";
import {Box, Button, Image, SimpleGrid} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {getCocktailList} from '../../../store/goodsSelectionSlice/index'

const GoodsSelection = () => {

    const cocktailList = useSelector(state => state.cocktailList.cocktailList)
    const dispatch = useDispatch()
    // const addCocktails = () => dispatch(createCocktailList())

    let {ingredientName} = useParams()
    const [groceryListSum, setGroceryListSum] = useState(null)


    useEffect(() => {
            dispatch(getCocktailList(ingredientName))
    }, [ingredientName])





    const ItemCardCreator = () => {
        return cocktailList.map((el, key) =>
                <Box key={key} m={'25'} maxW='sm' borderColor={'black'} borderWidth='1px' borderRadius='lg' overflow='hidden'>
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

                        <Box  textAlign='center'>
                            <Button   onClick={() => {
                                setGroceryListSum({...groceryListSum, [el.strDrink]: el.idDrink})
                                // localStorage.setItem('order', JSON.stringify(groceryListSum))
                            }}>Add tod Basket</Button>
                        </Box>

                        <Box display='flex' mt='2' alignItems='center'>
                            <Box as='span' ml='2' color='gray.600' fontSize='sm'>

                                { Math.round(Math.random() * 15)} likes
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


// const ItemCardCreator = () => {
//
//
//     return Object.keys(card).map(el =>
//         <div className={styles.cardItem} key={el}>
//             <Box maxH={'300px'} spacing={10}>
//                 <NavLink to={`${card[el].idDrink}`}>
//                     {card[el].strDrink}
//                     <img src={`${card[el].strDrinkThumb}`} alt={`${card[el].strDrink}`} height={120} width={120}/>
//                 </NavLink>
//                 <Button onClick={() =>{
//                     setGroceryListSum({...groceryListSum, [card[el].strDrink]:  card[el].idDrink})
//                 }}>Add to Basket</Button>
//
//
//                 <Button onClick={() => {
//                     localStorage.setItem(`testObject`, JSON.stringify('entries'))
//                 }}>
//                     Buy
//                 </Button>
//
//             </Box>
//         </div>
//     )
//
// }