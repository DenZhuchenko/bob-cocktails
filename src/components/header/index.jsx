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
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { signOutUser } from '../../api/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { basketAfterReload } from '../../store/basketSlice';
import { setCurrentUser } from '../../store/authSlice';
import { getAuth } from 'firebase/auth';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import basketSVG from '../../assets/Basket.png';

export default function Header() {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const { colorMode, toggleColorMode } = useColorMode();
  const basketData = useSelector((state) => state.basket.basket);
  const userData = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();
  const basketBeforeInitialize = JSON.parse(localStorage.getItem('order'))
    ? JSON.parse(localStorage.getItem('order'))
    : null;

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    dispatch(setCurrentUser(user));
    dispatch(basketAfterReload(basketBeforeInitialize));
  }, [user]);

  return (
    <Box position={'fixed'} top={0} left={0} right={0}>
      <Flex
        bg={useColorModeValue('orange.300', 'gray.900')}
        color={useColorModeValue('gray.600', 'grey.400')}
        display={'flex'}
        backgroundSize={'cover'}
        justifyContent={'space-between'}
        alignItems={'center'}
        width={'100%'}
        minH={'4rem'}
        boxSizing={'border-box'}
      >
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <NavLink to={'/Light%20rum'}>
            <Text
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              fontFamily={'heading'}
              pl={'4rem'}
              fontSize={'2rem'}
              color={useColorModeValue('gray.800', 'white')}
            >
              Bob&apos;s Store
            </Text>
          </NavLink>
        </Flex>

        <NavLink to={'/basket'}>
          <Button color={useColorModeValue('gray.800', 'white')} h={'3rem'} mr={'5rem'}>
            <Img h={'50px'} src={basketSVG} alt={'basket'} />
            <Box pl={'10px'}>{basketData.length ? basketData.length : null}</Box>
          </Button>
        </NavLink>
        <>
          {userData ? (
            <Button
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
          ) : (
            <Stack
              flex={{ base: 1, md: 0 }}
              justify={'flex-end'}
              direction={'row'}
              spacing={6}
            >
              <NavLink to={'/login'}>
                <Button
                  display={{ base: 'none', md: 'inline-flex' }}
                  fontSize={'sm'}
                  fontWeight={600}
                  color={'white'}
                  bg={'pink.400'}
                  mr={'3rem'}
                  href={'#'}
                  _hover={{
                    bg: 'pink.300',
                  }}
                >
                  Sign In
                </Button>
              </NavLink>
            </Stack>
          )}
        </>
        <Button mr={'1rem'} onClick={toggleColorMode}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Flex>
    </Box>
  );
}
