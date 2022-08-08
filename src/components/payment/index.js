import React from 'react'
import {Box, Button, Flex, FormControl, Input, VStack} from "@chakra-ui/react";
import {Form, Formik} from "formik";
import * as Yup from 'yup'


const Payment = () => {

    const currentYear = new Date().getFullYear()
    const maxLength = 14


    const invalidChars = [
        "-",
        "+",
        "e",
    ];


    document.addEventListener('keypress', function (e) {
        const cardInputValue = document.getElementById('cardNumber')
        if (cardInputValue.value.length >= 15) {
                cardInputValue.value = cardInputValue.value.slice(0, 15)
        }
        if (invalidChars.includes(e.key)) {
            e.preventDefault();
        }
    })


    document.addEventListener('keypress', function (e) {
        const cardInputValue = document.getElementById('dateM')
        if (cardInputValue.value.length >= 1) {
            cardInputValue.value = cardInputValue.value.slice(0, 1)

        }
        if (invalidChars.includes(e.key)) {
            e.preventDefault();
        }
    })


    document.addEventListener('keypress', function (e) {
        const cardInputValue = document.getElementById('dateY')
        if (cardInputValue.value.length >= 1) {
            cardInputValue.value = cardInputValue.value.slice(0, 1)
        }
        if (invalidChars.includes(e.key)) {
            e.preventDefault();
        }
    })


    document.addEventListener('keypress', function (e) {
        const cardInputValue = document.getElementById('cvv')
        if (cardInputValue.value.length >= 2) {
            cardInputValue.value = cardInputValue.value.slice(0, 2)
        }
        if (invalidChars.includes(e.key)) {
            e.preventDefault();
        }
    })


    const validationSchema = Yup.object().shape({
        number: Yup.string()
            .required('Required')
            .matches(/^[0-9]+$/, "Must be only digits")
            .max(16, 'error'),


        dateM: Yup.string()
            .required('Required')
            .matches(/^[0-9]+$/, "Must be only digits")
            .max(2, 'err'),


        dateY: Yup.string()
            .required('Required')
            .matches(/^[0-9]+$/, "Must be only digits")
            .max(2, 'err'),

        cvv: Yup.string()
            .required('Required')
            .matches(/^[0-9]+$/, "Must be only digits")
            .max(3, 'err')
        ,


    })


    return (
        <Flex bg="orange.100" align='center' justify='center' h='90vh'>
            <Box pt={'10rem'}
                 h='45rem'
                 w='40rem'
                 bg='white'
                 rounded='md'
            >
                <Formik initialValues={{
                    number: '',
                    dateM: '',
                    dateY: '',
                    cvv: '',
                }}
                        onSubmit={async (values, {resetForm}) => {
                            console.log(values)
                        }
                        }
                        validationSchema={validationSchema}
                >
                    {({
                          values,
                          handleChange,
                          dirty,
                          handleSubmit,
                          errors,
                          touched,
                          handleBlur,

                      }) => (
                        <Form onSubmit={handleSubmit}>
                            <VStack spacing={10} alight={'flex-start'}>

                                <FormControl pb={15} isInvalid={!!errors.number && touched.number}>
                                    <label htmlFor={'number'}>Card Number</label>

                                    <Input
                                        type={'number'}
                                        as={Input}
                                        id={'cardNumber'}
                                        name={'number'}
                                        maxLength={16}
                                        onChange={handleChange}
                                        value={values.number}
                                        onBlur={handleBlur}
                                        placeholder={'Enter Number'}
                                    />


                                </FormControl>


                                <FormControl pb={15} isInvalid={!!errors.dateM && touched.dateM}>
                                    <label htmlFor={'dateM'}>Month</label>
                                    <Input
                                        min={2}
                                        max={12}
                                        type={'number'}
                                        as={Input}
                                        maxLength={2}
                                        id={'dateM'}
                                        name={'dateM'}
                                        onChange={handleChange}
                                        value={values.dateM}
                                        onBlur={handleBlur}
                                        placeholder={'Enter Month'}
                                    />
                                </FormControl>

                                <FormControl pb={15} isInvalid={!!errors.dateY && touched.dateY}>
                                    <label htmlFor={'dateY'}>Year</label>
                                    <Input

                                        maxLength={2}
                                        type={'number'}
                                        as={Input}
                                        id={'dateY'}
                                        name={'dateY'}
                                        onChange={handleChange}
                                        value={values.dateY}
                                        onBlur={handleBlur}
                                        placeholder={'Enter Years'}
                                    />
                                </FormControl>

                                <FormControl pb={15} isInvalid={!!errors.cvv && touched.cvv}>
                                    <label htmlFor={'CVV'}>CVV</label>
                                    <Input
                                        maxLength={3}
                                        type={'number'}
                                        as={Input}
                                        id={'cvv'}
                                        name={'cvv'}
                                        onChange={handleChange}
                                        value={values.cvv}
                                        onBlur={handleBlur}
                                        placeholder={'cvv'}
                                    />
                                </FormControl>


                                <Button
                                    type={'submit'}
                                    colorScheme={'orange'}
                                    width={'full'}
                                    _hover={{
                                        background: 'orange',
                                        color: 'orange.50',
                                    }}
                                >
                                    Buy
                                </Button>

                            </VStack>
                        </Form>
                    )
                    }

                </Formik>

            </Box>
        </Flex>
    )
}

export default Payment


// const cardNumberHandler = (e) => {
//
//     let targetLength = e.target.value.length
//     const form = e.target.form
//     const test = [...form]
//     console.log(e.target)
//     console.log('test: ', test)
//
//     if (targetLength === 4) {
//         const index = [...form].indexOf(e.target);
//         form.elements[index + 1].focus();
//     }
//
//     if (targetLength === 0 ) {
//         const index = [...form].indexOf(e.target)
//         form.elements[index - 1].focus();
//     }
// }
//
// const cardDateHandler = (e) => {
//     let targetLength = e.target.value.length
//     const form = e.target.form
//
//     if (targetLength === 2) {
//         console.log(form)
//         const index = [...form].indexOf(e.target)
//         form.elements[index + 1].focus();
//     }
//
// }


// let dummyTxt = '1111222233334444';
// let joy = dummyTxt.match(/.{1,4}/g);
// let number = joy.join(' ')

//
// <Box
// w={'17rem'}
// h={'10rem'}
// border={'2px solid black'}
// borderRadius={'10px'}
// m={'10rem 0 0 3rem'}
// bg={'yellow.50'}
//     >
//
//
//     <Box
// m={'2rem 0 0 1rem'}
// bg={'yellow.100'}
// h={'2rem'}
// w={'4rem'}
// border={'1px solid black'}
// borderRadius={'5px'}
//     >
//
//
//     <Box pt={'3rem'}>
//     <form>
//     <HStack w={'15rem'}>
//     <Input
// onChange={(e) => {setCardNumber(e.target.value)}}
// value={cardNumber}
// minW={'3rem'}
// bgColor={'white'}
// textAlign={'center'}
// placeholder={'1111 2222 3333 4444'}
// _placeholder={{color: 'grey.50'}}
// maxLength={16}
// size='xs'/>
//
//     </HStack>
// </form>
// </Box>
//
//
// <HStack
//     pt={'1rem'}
//     w={'15rem'}
//     justifyContent={'space-between'}
//
// >
//     <Box
//         maxW={'4rem'}
//     >
//
//         <HStack>
//             <Input
//                 maxLength={2}
//                 textAlign={'center'}
//                 placeholder={'04'}
//                 size='xs'
//                 border={'none'}
//                 bgColor={'white'}
//             />
//
//         </HStack>
//
//
//     </Box>
//
//     <Box maxW={'3rem'}>
//         <Input maxLength={3}
//                bgColor={'white'}
//                textAlign={'center'}
//                placeholder={'CVV'}
//                size='xs'
//         />
//     </Box>
// </HStack>
//
// </Box>
//
// </Box>

