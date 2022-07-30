import React, {useEffect} from 'react'
import {Box, Button, Flex, Heading, Text} from "@chakra-ui/react";
import {NavLink} from "react-router-dom";
import {signOutUser, userObserver} from "../../api/firebase";
import {useDispatch, useSelector} from "react-redux";
import {basketAfterReload, clearAllBasket} from "../../store/goodsSelectionSlice";

const Header = () => {



    const basketData = useSelector(state => state.cocktailList.basket)



    const basketBeforeInitialize = JSON.parse(localStorage.getItem('order'))
        ? JSON.parse(localStorage.getItem('order'))
        : null
    const dispatch = useDispatch()

    const clearBasket = () => {
        dispatch(clearAllBasket())
    }


    useEffect(() => {
        userObserver()
        dispatch(basketAfterReload(basketBeforeInitialize))
    }, [])


    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            bg="orange.300"
        >
            <Flex>
                <Heading pl={'6rem'} as="h1" size="lg" letterSpacing={"-.1rem"}>
                    <NavLink to={'/Light%20rum'}>
                        {/*<Img src={logo} alt={'logo'} h={'3rem'} />*/}
                        <Text pt='0.5rem' color='black' h='3rem'>Bob's Store</Text>
                    </NavLink>
                </Heading>
            </Flex>
            <Button
                bg="transparent"
                border="2px"
                color='black'
                onClick={signOutUser}
            >
                Logout
            </Button>

            <Box>
                <Button
                    bg="transparent"
                    border="2px"
                    color='black'
                    onClick={signOutUser}
                >
                    Logout
                </Button>
                <NavLink to={'/login'}>
                    <Button
                        bg="transparent"
                        border="2px"
                        color='black'
                    >
                        Login
                    </Button>
                </NavLink>


                <NavLink to={'/basket'}>
                    <Button
                        color='black'
                        ml='5rem'
                        mr='5rem'
                        bg='transparent'
                        border='2px'
                    >
                        Basket   {basketData.length? basketData.length: null}
                    </Button>
                </NavLink>
                <Button
                    onClick={clearBasket}
                >
                    Reset Basket
                </Button>
                <Button>
                    <NavLink to={'payment'} >Payment</NavLink>
                </Button>



            </Box>
        </Flex>


    )
}

export default Header