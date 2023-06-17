import React from 'react'
import {Form, Formik} from "formik";
import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormErrorMessage,
    Input,
    useColorModeValue,
    VStack
} from "@chakra-ui/react";
import * as Yup from 'yup'
import {useNavigate} from "react-router-dom";
import {createUser} from "../../../api/firebase";
import {useSelector} from "react-redux";


const Registration = () => {

    const navigate = useNavigate();
    const client = useSelector(state => state.auth.currentUser)


    const validationSchema = Yup.object().shape({
        login: Yup.string()
            .required('Required')
            .min(3, 'min 3 symbols')
            .max(35, 'max 35 symbols'),
        email: Yup.string()
            .email('Invalid Email')
            .required('Required')
            .min(5, 'min 5 symbols')
            .max(35, 'max 35 symbols'),
        confirmEmail: Yup.string()
            .oneOf([Yup.ref('email'), null], 'Email must match')
            .email('wrong address')
            .required('Required')
            .min(5, 'min 5 symbols')
            .max(35, 'max 35 symbols'),
        password: Yup.string()
            .min(2, 'Too Short')
            .max(32, 'Too Long')
            .required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Password must match')
            .required('required')
            .min(2, 'min 5 symbols')
            .max(35, 'max 35 symbols'),

    })


    return (
        <div>
                <Flex
                    bg={useColorModeValue('orange.200', 'gray.800')}
                    color={useColorModeValue('gray.600', 'gray.800')}
                    align='center'
                    justify='center'
                    h='90vh'>
                    <Box
                        bg={useColorModeValue('white', 'gray.600')}
                        color={useColorModeValue('gray.700', 'white')}
                        p={25}
                        rounded={'md'}>
                        <Formik initialValues={
                            {
                                login: '',
                                email: '',
                                confirmEmail: '',
                                password: '',
                                confirmPassword: '',
                                rememberMe: false
                            }
                        }


                                onSubmit={async (values, {resetForm}) => {
                                    await createUser(values.email, values.password).then(res => {
                                        navigate('/', {replace: true})
                                    })
                                    resetForm({
                                        login: '',
                                        email: '',
                                        confirmEmail: '',
                                        password: '',
                                        confirmPassword: '',
                                        rememberMe: false
                                    })

                                }}

                                validationSchema={validationSchema}
                        >
                            {({
                                  values,
                                  handleBlur,
                                  handleChange,
                                  handleSubmit,
                                  touched,
                                  errors,
                                  dirty,
                              }) => (
                                <Form onSubmit={handleSubmit}>
                                    <VStack spacing={10} align={'flex-start'}>
                                        <FormControl pb={25} maxH={'5rem'}>
                                            <label htmlFor={'login'}>NickName</label>
                                            <Input
                                                type={'login'}
                                                id={'login'}
                                                name={'login'}
                                                onChange={handleChange}
                                                value={values.login}
                                                onBlur={handleBlur}
                                                placeholder={'Enter Login'}
                                            />
                                            {
                                                touched.login && errors.login &&
                                                <div color='red'>{errors.login}</div>
                                            }
                                        </FormControl>

                                        <FormControl pb={25} maxH={'5rem'}>
                                            <label htmlFor={'email'}>Email</label>
                                            <Input
                                                type={'email'}
                                                id={'email'}
                                                name={'email'}
                                                onChange={handleChange}
                                                value={values.email}
                                                onBlur={handleBlur}
                                                placeholder={'Enter Email'}
                                            />
                                            {
                                                touched.email && errors.email &&
                                                <div color='red'>{errors.email}</div>
                                            }
                                        </FormControl>

                                        <FormControl pb={25} maxH={'5rem'}>
                                            <label htmlFor={'confirmEmail'}>Confirm Email</label>
                                            <Input
                                                type={'email'}
                                                id={'confirmEmail'}
                                                name={'confirmEmail'}
                                                onChange={handleChange}
                                                value={values.confirmEmail}
                                                onBlur={handleBlur}
                                                placeholder={'Confirm Email'}
                                            />
                                            {
                                                touched.confirmEmail && errors.confirmEmail &&
                                                <div color='red'>{errors.confirmEmail}</div>
                                            }
                                        </FormControl>

                                        <FormControl pb={25} maxH={'5rem'}>
                                            <label htmlFor={'password'}>Password</label>
                                            <Input
                                                type={'password'}
                                                id={'password'}
                                                name={'password'}
                                                onChange={handleChange}
                                                value={values.password}
                                                onBlur={handleBlur}
                                                placeholder={'Enter Password'}
                                            />

                                            <FormErrorMessage>
                                                {
                                                    touched.password && errors.password &&
                                                    <div>{errors.password}</div>
                                                }
                                            </FormErrorMessage>

                                        </FormControl>

                                        <FormControl pb={25} maxH={'5rem'}>
                                            <label htmlFor={'confirmPassword'}> Confirm Password</label>
                                            <Input
                                                type={'password'}
                                                as={Input}
                                                id={'confirmPassword'}
                                                name={'confirmPassword'}
                                                onChange={handleChange}
                                                value={values.confirmPassword}
                                                onBlur={handleBlur}
                                                placeholder={'Enter Password'}
                                            />
                                            {touched.confirmPassword && errors.confirmPassword &&
                                                <div color='red'>{errors.confirmPassword}</div>
                                            }
                                        </FormControl>

                                        <Checkbox
                                            type={'checkbox'}
                                            id={'rememberMe'}
                                            name={'rememberMe'}
                                            onChange={handleChange}
                                            isChecked={values.rememberMe}
                                        >
                                            Remember Me?
                                        </Checkbox>


                                        <Button
                                            type={"submit"}
                                            colorScheme={'green'}
                                            width={'full'}
                                            _hover={{
                                                background: "green",
                                                color: "teal.100",
                                            }}
                                        >
                                            Registration
                                        </Button>

                                    </VStack>
                                </Form>
                            )}

                        </Formik>

                    </Box>
                </Flex>



                </div>


                )
            }

            export default Registration
