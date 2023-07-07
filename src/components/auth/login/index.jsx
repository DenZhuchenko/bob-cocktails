import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { signInUser } from '../../../api/firebase';
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  // const client = useSelector((state) => state.auth.currentUser);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid Email')
      .required('Required')
      .min(5, 'min 5 symbols')
      .max(35, 'max 35 symbols'),
    password: Yup.string().required('Required').min(2, 'Too Short').max(32, 'Too Long'),
  });

  return (
    <Box>
      <Flex
        align="center"
        justify="center"
        h="93vh"
        bg={useColorModeValue('orange.200', 'gray.800')}
        color={useColorModeValue('gray.600', 'gray.800')}
      >
        <Box
          p={25}
          rounded={'md'}
          bg={useColorModeValue('white', 'gray.600')}
          color={useColorModeValue('gray.700', 'white')}
        >
          <Formik
            initialValues={{
              email: '',
              password: '',
              rememberMe: false,
            }}
            onSubmit={async (values, { resetForm }) => {
              await signInUser(values.email, values.password).then((res) => {
                console.log('res from Login: ', res);
                navigate('/Light%20rum', { replace: true });
              });
              console.log('values: ', values);

              resetForm({
                email: '',
                password: '',
                rememberMe: null,
              });
            }}
            validationSchema={validationSchema}
          >
            {({ values, handleChange, handleSubmit, handleBlur }) => (
              <Form onSubmit={handleSubmit}>
                <VStack spacing={10} alight={'flex-start'}>
                  <FormControl pb={15}>
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
                  {/* <Checkbox*/}
                  {/*  type={'checkbox'}*/}
                  {/*  id={'rememberMe'}*/}
                  {/*  name={'rememberMe'}*/}
                  {/*  onChange={handleChange}*/}
                  {/*  isChecked={values.rememberMe}*/}
                  {/* >*/}
                  {/*  Remember Me*/}
                  {/* </Checkbox>*/}
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
                  <Box align={'center'}>
                    Dont have account?
                    <br />
                    <NavLink to={'/registration'} color="orange">
                      {' '}
                      Registration
                    </NavLink>
                  </Box>
                </VStack>
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>
    </Box>
  );
};

export default Login;
