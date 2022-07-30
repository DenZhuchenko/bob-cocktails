import React, {useState} from 'react'
import {Box, Flex, FormControl, FormHelperText, FormLabel, HStack, Input, Text} from "@chakra-ui/react";
import SumPrise from "../header/basket/sumPrise";

const Payment = () => {

    const [cardNumber, setCardNumber] = useState('')

    console.log(`cardNumber `, cardNumber)
    console.log(`cardNumberLength  `, cardNumber.length)

    const CardNumberHandler = () =>{



        return(
            <>
            </>
        )
    }



    return (
        <Flex bg="orange.100" align='center' justify='center' h='90vh'>
            <Box h='45rem'
                 w='40rem'
                 bg='white'
                 rounded='md'
            >
                Payment window
                {/*<Input mt={'10rem'} onChange={(e) => {*/}
                {/*    setCardNumber(e.target.value)*/}
                {/*}}/>*/}


                <Input mt={'10rem'} onChange={(e) => {
                    setCardNumber(e.currentTarget.value)}}/>


                <Box
                    w={'17rem'}
                    h={'10rem'}
                    border={'2px solid black'}
                    borderRadius={'10px'}
                    m={'10rem 0 0 3rem'}
                    bg={'yellow.50'}

                >
                    <Box
                        m={'2rem 0 0 1rem'}
                        bg={'yellow.100'}
                        h={'2rem'}
                        w={'4rem'}
                        border={'1px solid black'}
                        borderRadius={'5px'}
                    >


                        <Box pt={'3rem'}>
                            <HStack w={'15rem'}>
                                <Input onChange={(e) => {setCardNumber(e.target.value)}} minW={'3rem'} bgColor={'white'} textAlign={'center'} placeholder='0000'
                                       maxLength={4} size='xs'/>
                                <Input minW={'3rem'} bgColor={'white'} textAlign={'center'} placeholder='0000'
                                       maxLength={4} size='xs'/>
                                <Input minW={'3rem'} bgColor={'white'} textAlign={'center'} placeholder='0000'
                                       maxLength={4} size='xs'/>
                                <Input minW={'3rem'} bgColor={'white'} textAlign={'center'} placeholder='0000'
                                       maxLength={4} size='xs'/>
                            </HStack>
                        </Box>


                        <HStack
                            pt={'1rem'}
                            w={'15rem'}
                            justifyContent={'space-between'}

                        >
                            <Box
                                maxW={'4rem'}
                            >
                                <HStack>

                                    <Input
                                        maxLength={2}
                                        textAlign={'center'}
                                        placeholder={'04'}
                                        size='xs'
                                        border={'none'}
                                        bgColor={'white'}
                                    />
                                    <Input
                                        border={'none'}
                                        maxLength={2}
                                        textAlign={'center'}
                                        placeholder={'24'}
                                        bgColor={'white'}
                                        size='xs'
                                    >

                                    </Input>
                                </HStack>

                            </Box>

                            <Box maxW={'3rem'}>
                                <Input maxLength={3}
                                       bgColor={'white'}
                                       textAlign={'center'}
                                       placeholder={'CVV\t'}
                                       size='xs'
                                />
                            </Box>
                        </HStack>

                    </Box>


                    <Input mt={'10rem'}
                           maxLength={3}
                    />

                </Box>
            </Box>
        </Flex>
    )
}

export default Payment