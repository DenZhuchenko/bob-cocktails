import React, {useEffect, useState} from 'react'
import {Box, Button, Flex, FormControl, Input, useColorModeValue, VStack} from "@chakra-ui/react";
import {Form, Formik} from "formik";
import * as Yup from 'yup'
import {useDispatch, useSelector} from "react-redux";
import {clearAllBasket} from "../../store/basketSlice";
import {useNavigate} from "react-router-dom";


const Payment = () => {
    const dispatch = useDispatch()
    const order = useSelector(state => state.basket.basket)
    const totalSum = useSelector(state => state.basket.sumPrice)
    // console.log('totalSum: ', totalSum)

    const client = useSelector(state => state.auth.currentUser)
    const navigate = useNavigate()




    const invalidChars = [
        "-",
        "+",
        "e",
    ]

    const currentYear = new Date().getFullYear()



    function setInputFilter(textbox, inputFilter) {
        ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"].forEach(function (event) {
            if (textbox) {
                textbox.addEventListener(event, function (e) {
                    if (invalidChars.includes(e.key)) {
                        e.preventDefault();
                    }
                    if (inputFilter(this.value)) {
                        this.oldValue = this.value;
                    } else if (this.hasOwnProperty("oldValue")) {
                        this.value = this.oldValue;
                    }
                });
            }
            return null
        });
    }


    useEffect(() =>{

        setInputFilter(document.getElementById("cardNumber"), function (value) {
            return /^\d*$/.test(value) && (value === "" || parseInt(value) < Math.pow(10, 16))
        });

        setInputFilter(document.getElementById("dateM"), function (value) {

            return /^\d*$/.test(value) && (value === "" || (parseInt(value) > 0 && parseInt(value) <= 12))
        });

        setInputFilter(document.getElementById("dateY"), function (value) {
            return /^\d*$/.test(value) && (value === "" || (parseInt(value) > 0 && parseInt(value) <= currentYear + 10))
        });

        setInputFilter(document.getElementById("cvv"), function (value) {
            return /^\d*$/.test(value) && (value === "" || (parseInt(value) > 0 && parseInt(value) < 1000))
        });

    }, [])








    const validationSchema = Yup.object().shape({

        number: Yup.string()
            .required('Required')
            .matches(/^[0-9]+$/, "Must be only digits")
            .max(16, 'Must contain 16 digits'),

        dateM: Yup.string()
            .required('Required')
            .matches(/^[0-9]+$/, "Must be only digits")
            .max(2, 'Must contain up to 2 digits'),

        dateY: Yup.string()
            .required('Required')
            .matches(/^[0-9]+$/, "Must be only digits")
            .max(4, 'Must contain 4 digits'),

        cvv: Yup.string()
            .required('Required')
            .matches(/^[0-9]+$/, "Must be only digits")
            .max(3, 'CVV must contain 3 digits')
        ,
    })



    return (
        <Flex
            bg={useColorModeValue('orange.200', 'gray.800')}
            color={useColorModeValue('gray.600', 'gray.100')}
            align='center' justify='center' h='90vh'>

            <Box p={'3rem'}
                 h='45rem'
                 w='40rem'
                 rounded='md'
                 bg={useColorModeValue('white', 'gray.700')}
                 color={useColorModeValue('gray.600', 'gray.100')}
            >


                <Formik initialValues={{
                    number: '',
                    dateM: '',
                    dateY: '',
                    cvv: '',
                }}
                        onSubmit={async (values, {resetForm}) => {
                            // post this info into googleFirebase
                            console.log('Client ID: ', client ? client.uid : null)
                            console.log('Client email: ', client ? client.email : null)
                            console.log('Payment Info: ', values)
                            console.log('Order: ', order)
                            console.log('totalSum: ', totalSum)
                            resetForm('')
                            dispatch(clearAllBasket())
                            navigate('/Light%20rum', {replace: true})

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
                        <Form
                            onSubmit={handleSubmit}>
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


//
// document.addEventListener('keypress', function (e) {
//     const cardInputValue = document.getElementById('cardNumber')
//     if (cardInputValue.value.length >= 15) {
//         cardInputValue.value = cardInputValue.value.slice(0, 15)
//     }
//     if (invalidChars.includes(e.key)) {
//         e.preventDefault();
//     }
// })


// document.addEventListener('keypress', function (e) {
//     const cardInputValue = document.getElementById('dateM')
//     if (cardInputValue.value.length >= 1) {
//         cardInputValue.value = cardInputValue.value.slice(0, 1)
//
//     }
//     if (invalidChars.includes(e.key)) {
//         e.preventDefault();
//     }
// })
//
//
// document.addEventListener('keypress', function (e) {
//     const cardInputValue = document.getElementById('dateY')
//     if (cardInputValue.value.length >= 1) {
//         cardInputValue.value = cardInputValue.value.slice(0, 1)
//     }
//     if (invalidChars.includes(e.key)) {
//         e.preventDefault();
//     }
// })
//
//
// document.addEventListener('keypress', function (e) {
//     const cardInputValue = document.getElementById('cvv')
//     if (cardInputValue.value.length >= 2) {
//         cardInputValue.value = cardInputValue.value.slice(0, 2)
//     }
//     if (invalidChars.includes(e.key)) {
//         e.preventDefault();
//     }
// })


// import React, {useState} from 'react'
// import {Box, Button, Flex, FormControl, Input, useColorModeValue, VStack} from "@chakra-ui/react";
// import {Form, Formik} from "formik";
// import * as Yup from 'yup'
// import {useDispatch, useSelector} from "react-redux";
// import {clearAllBasket} from "../../store/basketSlice";
//
//
// const Payment = () => {
//     const dispatch = useDispatch()
//     const order = useSelector(state => state.basket.basket)
//     const totalSum = useSelector(state => state.basket.sumPrice)
//     const client = useSelector(state => state.auth.currentUser)
//
//
//
//
//     const [testNumber, setTestNumber] = useState('1111222233334444')
//     console.log(testNumber.split(' ', 2))
//
//
//
//
//
//
//     const invalidChars = [
//         "-",
//         "+",
//         "e",
//     ];
//
//
//     document.addEventListener('keypress', function (e) {
//         const cardInputValue = document.getElementById('cardNumber')
//         if (cardInputValue.value.length >= 15) {
//             cardInputValue.value = cardInputValue.value.slice(0, 15)
//         }
//         if (invalidChars.includes(e.key)) {
//             e.preventDefault();
//         }
//     })
//
//
//     document.addEventListener('keypress', function (e) {
//         const cardInputValue = document.getElementById('dateM')
//         if (cardInputValue.value.length >= 1) {
//             cardInputValue.value = cardInputValue.value.slice(0, 1)
//
//         }
//         if (invalidChars.includes(e.key)) {
//             e.preventDefault();
//         }
//     })
//
//
//     document.addEventListener('keypress', function (e) {
//         const cardInputValue = document.getElementById('dateY')
//         if (cardInputValue.value.length >= 1) {
//             cardInputValue.value = cardInputValue.value.slice(0, 1)
//         }
//         if (invalidChars.includes(e.key)) {
//             e.preventDefault();
//         }
//     })
//
//
//     document.addEventListener('keypress', function (e) {
//         const cardInputValue = document.getElementById('cvv')
//         if (cardInputValue.value.length >= 2) {
//             cardInputValue.value = cardInputValue.value.slice(0, 2)
//         }
//         if (invalidChars.includes(e.key)) {
//             e.preventDefault();
//         }
//     })
//
//
//     const validationSchema = Yup.object().shape({
//         number: Yup.string()
//             .required('Required')
//             .matches(/^[0-9]+$/, "Must be only digits")
//             .max(16, 'error'),
//
//
//         dateM: Yup.string()
//             .required('Required')
//             .matches(/^[0-9]+$/, "Must be only digits")
//             .max(2, 'err'),
//
//
//         dateY: Yup.string()
//             .required('Required')
//             .matches(/^[0-9]+$/, "Must be only digits")
//             .max(2, 'err'),
//
//         cvv: Yup.string()
//             .required('Required')
//             .matches(/^[0-9]+$/, "Must be only digits")
//             .max(3, 'err')
//         ,
//
//
//     })
//
//
//     return (
//         <Flex
//
//             bg={useColorModeValue('orange.200', 'gray.800')}
//             color={useColorModeValue('gray.600', 'gray.100')}
//
//             align='center' justify='center' h='90vh'>
//             <Box pt={'10rem'}
//                  h='45rem'
//                  w='40rem'
//                  bg='white'
//                  rounded='md'
//             >
//                 <Formik initialValues={{
//                     number: '',
//                     dateM: '',
//                     dateY: '',
//                     cvv: '',
//                 }}
//                         onSubmit={async (values, {resetForm}) => {
//                             // post this info into googleFirebase
//                             console.log('Client ID: ', client ? client.uid : null)
//                             console.log('Client email: ', client ? client.email : null)
//                             console.log('Payment Info: ', values)
//                             console.log('Order: ', order)
//                             console.log('totalSum: ', totalSum)
//                             resetForm('')
//                             dispatch(clearAllBasket())
//
//                         }
//                         }
//                         validationSchema={validationSchema}
//                 >
//                     {({
//                           values,
//                           handleChange,
//                           dirty,
//                           handleSubmit,
//                           errors,
//                           touched,
//                           handleBlur,
//
//                       }) => (
//                         <Form onSubmit={handleSubmit}>
//                             <VStack spacing={10} alight={'flex-start'}>
//
//                                 <FormControl pb={15} isInvalid={!!errors.number && touched.number}>
//                                     <label htmlFor={'number'}>Card Number</label>
//
//                                     <Input
//                                         type={'number'}
//                                         as={Input}
//                                         id={'cardNumber'}
//                                         name={'number'}
//                                         maxLength={16}
//                                         onChange={handleChange}
//                                         value={values.number}
//                                         onBlur={handleBlur}
//                                         placeholder={'Enter Number'}
//                                     />
//
//
//                                 </FormControl>
//
//                                 <FormControl>
//                                     <label htmlFor={'test'}>Test Number</label>
//
//                                     <Input
//                                         type={'number'}
//                                         as={Input}
//                                         id={'test'}
//                                         name={'number'}
//                                         maxLength={16}
//                                         onChange={(e)=>{setTestNumber(e.target.value)}}
//                                         value={testNumber}
//                                         onBlur={handleBlur}
//                                         placeholder={'Enter Test Number'}
//                                     />
//
//
//                                 </FormControl>
//
//
//                                 <FormControl pb={15} isInvalid={!!errors.dateM && touched.dateM}>
//                                     <label htmlFor={'dateM'}>Month</label>
//                                     <Input
//                                         min={2}
//                                         max={12}
//                                         type={'number'}
//                                         as={Input}
//                                         maxLength={2}
//                                         id={'dateM'}
//                                         name={'dateM'}
//                                         onChange={handleChange}
//                                         value={values.dateM}
//                                         onBlur={handleBlur}
//                                         placeholder={'Enter Month'}
//                                     />
//                                 </FormControl>
//
//                                 <FormControl pb={15} isInvalid={!!errors.dateY && touched.dateY}>
//                                     <label htmlFor={'dateY'}>Year</label>
//                                     <Input
//
//                                         maxLength={2}
//                                         type={'number'}
//                                         as={Input}
//                                         id={'dateY'}
//                                         name={'dateY'}
//                                         onChange={handleChange}
//                                         value={values.dateY}
//                                         onBlur={handleBlur}
//                                         placeholder={'Enter Years'}
//                                     />
//                                 </FormControl>
//
//                                 <FormControl pb={15} isInvalid={!!errors.cvv && touched.cvv}>
//                                     <label htmlFor={'CVV'}>CVV</label>
//                                     <Input
//                                         maxLength={3}
//                                         type={'number'}
//                                         as={Input}
//                                         id={'cvv'}
//                                         name={'cvv'}
//                                         onChange={handleChange}
//                                         value={values.cvv}
//                                         onBlur={handleBlur}
//                                         placeholder={'cvv'}
//                                     />
//                                 </FormControl>
//
//
//                                 <Button
//                                     type={'submit'}
//                                     colorScheme={'orange'}
//                                     width={'full'}
//                                     _hover={{
//                                         background: 'orange',
//                                         color: 'orange.50',
//                                     }}
//                                 >
//                                     Buy
//                                 </Button>
//
//                             </VStack>
//                         </Form>
//                     )
//                     }
//
//                 </Formik>
//
//             </Box>
//         </Flex>
//     )
// }
//
// export default Payment
