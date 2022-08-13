import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import {cocktailAPI} from "../../../../api/cocktailAPI";
import {Box, Image, Spinner} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {getCocktailItem} from "../../../../store/goodsSelectionSlice/index";

const Cocktail = () => {

    const currentCocktailInfo = useSelector(state => state.cocktailList.cocktailItem)
    const status = useSelector(state => state.cocktailList.status)
    console.log('currentCocktailInfo right now: ', currentCocktailInfo.ingredients ? currentCocktailInfo.ingredients : null )
    console.log('status: ', status)
    const dispatch = useDispatch()
    const {id} = useParams()

    useEffect(() => {
        dispatch(getCocktailItem(id))
    }, [id])



    const IngredientsList = () => {

        return Object.entries(currentCocktailInfo.ingredients).map(([key, value]) =>
                <Box fontWeight='semibold'
                     key={value + Math.random()}>
                    {value ? value : null} {key}
                </Box>
            )
    }


    return (
        <>

            <Box m={'25'} maxW='sm' borderColor={'black'} borderWidth='1px' borderRadius='lg' overflow='hidden'>

                {
                    status === 'fulfilled'
                        ?
                        <>
                            <Image src={currentCocktailInfo.img} alt={'imageAlt'}/>
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
                            <Box p='6'>



                                <IngredientsList/>

                                <br/>

                                <Box>
                                    {currentCocktailInfo.id.substring(0, 2) - 7}
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
                        </>
                        : <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='orange.200'
                            color='blue.500'
                            size='xl'
                        />
                }





            </Box>
        </>
    )

}

export default Cocktail





// import React, {useEffect, useState} from 'react'
// import {useParams} from "react-router-dom";
// import {cocktailAPI} from "../../../../api/cocktailAPI";
// import {Box, Image, Spinner} from "@chakra-ui/react";
// import {useDispatch, useSelector} from "react-redux";
// import {getCocktailItem} from "../../../../store/goodsSelectionSlice/index";
//
// const Cocktail = () => {
//
//     const currentCocktailInfo = useSelector(state => state.cocktailList.cocktailItem)
//     const status = useSelector(state => state.cocktailList.status)
//     console.log('currentCocktailInfo right now: ', currentCocktailInfo.ingredients ? currentCocktailInfo.ingredients : null )
//     console.log('status: ', status)
//     const dispatch = useDispatch()
//     const {id} = useParams()
//
//     useEffect(() => {
//         dispatch(getCocktailItem(id))
//     }, [id])
//
//
//
//     const IngredientsList = () => {
//
//         return Object.entries(currentCocktailInfo.ingredients).map(([key, value]) =>
//             <Box fontWeight='semibold'
//                  key={value + Math.random()}>
//                 {value ? value : null} {key}
//             </Box>
//         )
//     }
//
//
//     return (
//         <>
//
//             <Box m={'25'} maxW='sm' borderColor={'black'} borderWidth='1px' borderRadius='lg' overflow='hidden'>
//
//                 {
//                     status === 'fulfilled'
//                         ?
//                         <>
//                             <Image src={currentCocktailInfo.img} alt={'imageAlt'}/>
//                             <Box
//                                 mt='1'
//                                 fontWeight='bold'
//                                 as='h2'
//                                 lineHeight='tight'
//                                 noOfLines={1}
//                                 textAlign={'center'}
//                             >
//                                 {currentCocktailInfo.name}
//                             </Box>
//                             <Box p='6'>
//
//
//
//                                 <IngredientsList/>
//
//                                 <br/>
//
//                                 <Box>
//                                     {currentCocktailInfo.id.substring(0, 2) - 7}
//                                     <Box as='span' color='gray.600' fontSize='sm'>
//                                         $
//                                     </Box>
//                                 </Box>
//
//                                 <Box display='flex' mt='2' alignItems='center'>
//                                     <Box as='span' color='gray.600' fontSize='sm'>
//                                         {Math.round(Math.random() * 15)} reviews
//                                     </Box>
//                                 </Box>
//                             </Box>
//                         </>
//                         : <Spinner
//                             thickness='4px'
//                             speed='0.65s'
//                             emptyColor='orange.200'
//                             color='blue.500'
//                             size='xl'
//                         />
//                 }
//
//
//
//
//
//             </Box>
//         </>
//     )
//
// }
//
// export default Cocktail
