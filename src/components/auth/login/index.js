import React from 'react'
import {Form, Formik} from "formik";
import * as Yup from 'yup'
import {Box, Button, Checkbox, Flex, FormControl, Input, VStack} from "@chakra-ui/react";
import {signInUser} from "../../../api/firebase";
import {NavLink, useNavigate} from "react-router-dom";


const Login = (props) => {

    const {loginHandler} = props

    const navigate = useNavigate();


    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid Email')
            .required('Required')
            .min(5, 'min 5 symbols')
            .max(35, 'max 35 symbols'),
        password: Yup.string()
            .required('Required')
            .min(2, 'Too Short')
            .max(32, 'Too Long')
    })

    return (
        <div>
            <Flex bg="orange.100" align='center' justify='center' h='90vh'>
                <Box bg={'white'} p={25} rounded={'md'}>

                    <Formik initialValues={{
                        email: '',
                        password: '',
                        rememberMe: false
                    }}
                            onSubmit={ async (values, {resetForm}) => {
                                await signInUser(values.email, values.password).then(() =>{
                                    navigate('/', {replace: true})
                                    loginHandler(true)
                                })
                                console.log('values: ', values)
                                resetForm({
                                    email: '',
                                    password: '',
                                    rememberMe: null
                                })
                            }}
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
                                    <FormControl pb={15} >
                                        <label htmlFor={'email'}>Email</label>
                                        <Input
                                            type={'email'}
                                            as={Input}
                                            id={'email'}
                                            name={'email'}
                                            onChange={handleChange}
                                            value={values.email}
                                            onBlur={handleBlur}
                                            placeholder={'Enter Email'}
                                        />
                                    </FormControl>
                                    <FormControl pb={15}>
                                        <label htmlFor={'password'}>Password</label>
                                        <Input
                                            type={'password'}
                                            as={Input}
                                            id={'password'}
                                            name={'password'}
                                            onChange={handleChange}
                                            value={values.password}
                                            onBlur={handleBlur}
                                            placeholder={'Enter Password'}
                                        />
                                    </FormControl>
                                    <Checkbox
                                        type={'checkbox'}
                                        id={'rememberMe'}
                                        name={'rememberMe'}
                                        onChange={handleChange}
                                        isChecked={values.rememberMe}
                                    >
                                        Remember Me
                                    </Checkbox>

                                    <Button
                                        type={'submit'}
                                        colorScheme={'orange'}
                                        width={'full'}
                                        _hover={{
                                            background: 'orange',
                                            color: 'orange.50',
                                        }}
                                    >
                                        Login
                                    </Button>
                                    <div align={'center'}>
                                        Dont have account?
                                        <br/>
                                        <NavLink to={'/registration'} color='orange'> Registration</NavLink>
                                    </div>
                                </VStack>
                            </Form>
                        )
                        }

                    </Formik>

                </Box>
            </Flex>
        </div>
    )
}

export default Login