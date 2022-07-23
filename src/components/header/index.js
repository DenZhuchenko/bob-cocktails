import React, {useEffect, useState} from 'react'
import {Box, Button, Flex, Heading, Text} from "@chakra-ui/react";
import {NavLink} from "react-router-dom";
import {signOutUser, userObserver} from "../../api/firebase";

const Header = () => {


    const [login, setLogin] = useState('')
    const sessionJSON = localStorage.getItem('session_json')
    // console.log('login from header: ', login)

    const loginHandler = () => {
        setLogin(sessionJSON)
    }

    useEffect(() => {
        userObserver()
        loginHandler()
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
                    <NavLink to={'/'}>
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

                {
                    !login ? <Button
                            bg="transparent"
                            border="2px"
                            color='black'
                            onClick={signOutUser}
                        >
                            Logout
                        </Button>
                        : <NavLink to={'/login'}>
                            <Button
                                bg="transparent"
                                border="2px"
                                color='black'
                            >
                                Login
                            </Button>
                        </NavLink>

                }


                <NavLink to={'/basket'}>
                    <Button
                        color='black'
                        ml='5rem'
                        mr='5rem'
                        bg='transparent'
                        border='2px'
                    >
                        Basket
                    </Button>
                </NavLink>

            </Box>
        </Flex>


    )
}

export default Header