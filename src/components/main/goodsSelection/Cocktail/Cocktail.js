import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    IconButton,
    Image,
    SimpleGrid,
    Stack,
    StackDivider,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import React, {useEffect} from 'react'
import {NavLink, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCocktailItem} from "../../../../store/goodsSelectionSlice/index";
import {CheckCircleIcon} from "@chakra-ui/icons";
import {fillUpBasket} from "../../../../store/basketSlice";

export default function Cocktail() {

    const currentCocktailInfo = useSelector(state => state.cocktailList.cocktailItem)
    const status = useSelector(state => state.cocktailList.status)
    console.log('currentCocktailInfo: ', currentCocktailInfo)
    const basket = useSelector(state => state.basket.basket)
    console.log('basket: ', basket)

    const existInBasket = basket.find(product => product.id === currentCocktailInfo.id)


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
        <Container maxW={'7xl'}>
            <SimpleGrid
                columns={{base: 1, lg: 2}}
                spacing={{base: 8, md: 10}}
                py={{base: 18, md: 24}}>
                <Flex>
                    <Image
                        rounded={'md'}
                        src={currentCocktailInfo.img} alt={'imageAlt'}
                        fit={'cover'}
                        align={'center'}
                        w={'100%'}
                        h={{base: '100%', sm: '400px', lg: '500px'}}
                    />
                </Flex>
                <Stack spacing={{base: 6, md: 10}}>
                    <Box as={'header'}>
                        <Heading
                            lineHeight={1.1}
                            fontWeight={600}
                            fontSize={{base: '2xl', sm: '4xl', lg: '5xl'}}>
                            {currentCocktailInfo.name}
                        </Heading>

                        <Text
                            fontSize={{base: '16px', lg: '2xl'}}
                            color={useColorModeValue('black.500', 'yellow.300')}
                            fontWeight={'500'}
                            mb={'4'}

                        >
                            Price {currentCocktailInfo.price}$
                        </Text>


                    </Box>

                    <Stack
                        spacing={{base: 4, sm: 6}}
                        direction={'column'}
                        divider={
                            <StackDivider
                                borderColor={useColorModeValue('gray.200', 'gray.600')}
                            />
                        }>

                        <Box>
                            <Text
                                fontSize={{base: '16px', lg: '18px'}}
                                color={useColorModeValue('black.500', 'yellow.300')}
                                fontWeight={'500'}
                                textTransform={'uppercase'}
                                mb={'4'}>
                                INGREDIENTS
                            </Text>
                            <IngredientsList/>
                        </Box>
                        <Box>
                            <Text
                                fontSize={{base: '16px', lg: '18px'}}
                                color={useColorModeValue('black.500', 'yellow.300')}
                                fontWeight={'500'}
                                textTransform={'uppercase'}
                                mb={'4'}>
                                METHOD
                            </Text>

                            <Text spacing={2}>
                                {currentCocktailInfo.method}
                            </Text>
                        </Box>
                    </Stack>


                    {existInBasket ?
                        <NavLink to={'/basket'}>
                            <IconButton
                                rounded={'none'}
                                w={'full'}
                                size={'lg'}
                                py={'7'}
                                // bg={useColorModeValue('gray.900', 'gray.50')}
                                bg={'green.600'}
                                // color={useColorModeValue('white', 'gray.900')}
                                color={"white"}
                                textTransform={'uppercase'}
                                _hover={{
                                    transform: 'translateY(2px)',
                                    boxShadow: 'lg',
                                }}
                                icon={<CheckCircleIcon/>}
                            />
                        </NavLink>

                        :
                        <Button
                            rounded={'none'}
                            w={'full'}
                            mt={8}
                            size={'lg'}
                            py={'7'}
                            color={"white"}
                            textTransform={'uppercase'}
                            _hover={{
                                transform: 'translateY(2px)',
                                boxShadow: 'lg',
                            }}
                            onClick={() => {
                                dispatch(fillUpBasket(
                                    {
                                        name: currentCocktailInfo.name,
                                        id: currentCocktailInfo.id,
                                        img: currentCocktailInfo.img,
                                        count: 1,
                                        price: currentCocktailInfo.id.substring(0, 2) - 7,
                                        totalPrice: currentCocktailInfo.id.substring(0, 2) - 7
                                    }
                                ))
                            }
                            }

                        >
                            Add to basket
                        </Button>
                    }


                </Stack>
            </SimpleGrid>


        </Container>


    );
}


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
