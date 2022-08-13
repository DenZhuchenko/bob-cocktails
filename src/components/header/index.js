import {
    Box,
    Button,
    Flex,
    Img,
    Stack,
    Text,
    useBreakpointValue,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react'
import {NavLink} from "react-router-dom";
import {signOutUser} from "../../api/firebase";
import {useDispatch, useSelector} from "react-redux";
import {basketAfterReload, clearAllBasket} from "../../store/basketSlice";
import {setCurrentUser} from "../../store/authSlice";
import {getAuth,} from 'firebase/auth'
import {MoonIcon, SunIcon} from "@chakra-ui/icons";
import basketSVG from '../../assets/basketSVG.svg'


export default function Header() {


    const auth = getAuth()

    const [user, setUser] = useState(null)
    const {colorMode, toggleColorMode} = useColorMode();
    const basketData = useSelector(state => state.basket.basket)
    const userData = useSelector(state => state.auth.currentUser)


    const dispatch = useDispatch()
    const basketBeforeInitialize = JSON.parse(localStorage.getItem('order'))
        ? JSON.parse(localStorage.getItem('order'))
        : null


    const clearBasket = () => {
        dispatch(clearAllBasket())
    }


    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user)
        });
        dispatch(setCurrentUser(user))
        dispatch(basketAfterReload(basketBeforeInitialize))
    }, [user])


    return (
        <Box>
            <Flex
                bg={useColorModeValue('gray.100', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'4rem'}
                py={{base: 2}}
                px={{base: 4}}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>


                <Flex flex={{base: 1}} justify={{base: 'center', md: 'start'}}>
                    <NavLink to={'/Light%20rum'}>
                        <Text
                            textAlign={useBreakpointValue({base: 'center', md: 'left'})}
                            fontFamily={'heading'}
                            pl={'3rem'}
                            fontSize={'2rem'}
                            color={useColorModeValue('gray.800', 'white')}
                        >
                            Bob's Store
                        </Text>
                    </NavLink>
                </Flex>


                <NavLink to={'/basket'}>
                    <Button color={useColorModeValue('gray.800', 'white')} h={'3rem'} mr={'5rem'}>
                        <Img src={basketSVG} alt={'basket'}/>
                            {basketData.length ? basketData.length : null}
                    </Button>
                </NavLink>
                <>
                    {userData
                        ? <Button
                            pr={'3rem'}
                            justify={'flex-end'}
                            as={'a'}
                            fontSize={'sm'}
                            fontWeight={400}
                            variant={'link'}
                            href={'#'}
                            onClick={signOutUser}
                        >
                            Sign Out
                        </Button>

                        : <Stack
                            flex={{base: 1, md: 0}}
                            justify={'flex-end'}
                            direction={'row'}
                            spacing={6}>

                            <NavLink to={'/login'}>
                                <Button
                                    display={{base: 'none', md: 'inline-flex'}}
                                    fontSize={'sm'}
                                    fontWeight={600}
                                    color={'white'}
                                    bg={'pink.400'}
                                    mr={'3rem'}
                                    href={'#'}
                                    _hover={{
                                        bg: 'pink.300',
                                    }}>
                                    Sign In
                                </Button>
                            </NavLink>


                        </Stack>
                    }
                </>
                <Button onClick={toggleColorMode}>
                    {colorMode === 'light' ? <MoonIcon/> : <SunIcon/>}
                </Button>


            </Flex>


        </Box>
    );
}


// import React, {useEffect, useState} from 'react'
// import {Box, Button, Flex, Heading, Text} from "@chakra-ui/react";
// import {NavLink} from "react-router-dom";
// import {signOutUser} from "../../api/firebase";
// import {useDispatch, useSelector} from "react-redux";
// import {basketAfterReload, clearAllBasket} from "../../store/basketSlice";
// import {setCurrentUser} from "../../store/authSlice";
//
// import {getAuth,} from 'firebase/auth'
//
//
// const Header = () => {
//
//     const auth = getAuth()
//
//     const [user, setUser] = useState(null)
//     const basketData = useSelector(state => state.basket.basket)
//     const userData = useSelector(state => state.auth.currentUser)
//
//
//     const dispatch = useDispatch()
//     const basketBeforeInitialize = JSON.parse(localStorage.getItem('order'))
//         ? JSON.parse(localStorage.getItem('order'))
//         : null
//
//
//     const clearBasket = () => {
//         dispatch(clearAllBasket())
//     }
//
//
//     useEffect(() => {
//         auth.onAuthStateChanged((user) => {
//             setUser(user)
//         });
//         dispatch(setCurrentUser(user))
//         dispatch(basketAfterReload(basketBeforeInitialize))
//     }, [user])
//
//
//
//     return (
//         <Flex
//             as="nav"
//             align="center"
//             justify="space-between"
//             wrap="wrap"
//             bg="orange.300"
//         >
//
//
//             <Flex>
//                 <Heading pl={'6rem'} as="h1" size="lg" letterSpacing={"-.1rem"}>
//                     <NavLink to={'/Light%20rum'}>
//                         {/*<Img src={logo} alt={'logo'} h={'3rem'} />*/}
//                         <Text pt='0.5rem' color='black' h='3rem'>Bob's Store</Text>
//                     </NavLink>
//                 </Heading>
//             </Flex>
//
//
//             <Box>
//                 {
//                     userData
//                         ? <Button
//                             bg="transparent"
//                             border="2px"
//                             color='black'
//                             onClick={signOutUser}
//                         >
//                             Logout
//                         </Button>
//                         :                <NavLink to={'/login'}>
//                             <Button
//                                 bg="transparent"
//                                 border="2px"
//                                 color='black'
//                             >
//                                 Login
//                             </Button>
//                         </NavLink>
//                 }

//
//                 {
//                     userData ? userData.email : null
//                 }
//
//                 <NavLink to={'/basket'}>
//                     <Button
//                         color='black'
//                         ml='5rem'
//                         mr='5rem'
//                         bg='transparent'
//                         border='2px'
//                     >
//                         Basket {basketData.length ? basketData.length : null}
//                     </Button>
//                 </NavLink>

//                 <Button
//                     onClick={clearBasket}
//                 >
//                     Reset Basket
//                 </Button>
//             </Box>
//         </Flex>
//
//
//     )
// }
//
// export default Header