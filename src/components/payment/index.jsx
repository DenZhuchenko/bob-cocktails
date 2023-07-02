import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { clearAllBasket } from '../../store/basketSlice';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { purchaseDataByUserID } from '../../api/firebase';
import axios from 'axios';

const Payment = () => {
  const auth = getAuth();
  const userID = auth.currentUser?.uid;

  const dispatch = useDispatch();
  const order = useSelector((state) => state.basket.basket);
  const totalSum = useSelector((state) => state.basket.sumPrice);

  const client = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();

  const invalidChars = ['-', '+', 'e'];

  const currentYear = new Date().getFullYear();

  function setInputFilter(textbox, inputFilter) {
    [
      'input',
      'keydown',
      'keyup',
      'mousedown',
      'mouseup',
      'select',
      'contextmenu',
      'drop',
      'focusout',
    ].forEach(function (event) {
      if (textbox) {
        textbox.addEventListener(event, function (e) {
          if (invalidChars.includes(e.key)) {
            e.preventDefault();
          }
          if (inputFilter(this.value)) {
            this.oldValue = this.value;
          } else if (this.hasOwnProperty('oldValue')) {
            this.value = this.oldValue;
          }
        });
      }
      return null;
    });
  }

  useEffect(() => {
    setInputFilter(document.getElementById('cardNumber'), function (value) {
      return /^\d*$/.test(value) && (value === '' || parseInt(value) < Math.pow(10, 16));
    });

    setInputFilter(document.getElementById('dateM'), function (value) {
      return (
        /^\d*$/.test(value) &&
        (value === '' || (parseInt(value) > 0 && parseInt(value) <= 12))
      );
    });

    setInputFilter(document.getElementById('dateY'), function (value) {
      return (
        /^\d*$/.test(value) &&
        (value === '' || (parseInt(value) > 0 && parseInt(value) <= currentYear + 10))
      );
    });

    setInputFilter(document.getElementById('cvv'), function (value) {
      return (
        /^\d*$/.test(value) &&
        (value === '' || (parseInt(value) > 0 && parseInt(value) < 1000))
      );
    });
  }, []);

  const validationSchema = Yup.object().shape({
    number: Yup.string()
      .required('Required')
      .matches(/^[0-9]+$/, 'Must be only digits')
      .length(16, 'Must contain 16 digits'),
    dateM: Yup.string()
      .required('Required')
      .matches(/^[0-9]+$/, 'Must be only digits')
      .length(2, 'Must contain 2 digits'),
    dateY: Yup.string()
      .required('Required')
      .matches(/^[0-9]+$/, 'Must be only digits')
      .length(4, 'Must contain 4 digits'),
    cvv: Yup.string()
      .required('Required')
      .matches(/^[0-9]+$/, 'Must be only digits')
      .length(3, 'CVV must contain 3 digits'),
  });

  return (
    <Flex
      bg={useColorModeValue('orange.200', 'gray.800')}
      color={useColorModeValue('gray.600', 'gray.100')}
      align="center"
      justify="center"
      h="90vh"
    >
      <Box
        p={'3rem'}
        h="45rem"
        w="40rem"
        rounded="md"
        bg={useColorModeValue('white', 'gray.700')}
        color={useColorModeValue('gray.600', 'gray.100')}
      >
        <Formik
          onSubmit={async (values, { resetForm }) => {
            console.log('Client ID: ', client ? client.uid : null);
            console.log('Client email: ', client ? client.email : null);
            // console.log('values from paymeny: ', values);
            const transitionPayload = {
              paymentInfo: values,
              order: order,
              totalSum: totalSum,
              data: new Date(),
            };
            console.log('transitionPayload: ', transitionPayload);
            resetForm('');
            dispatch(clearAllBasket());
            navigate('/Light%20rum', { replace: true });
          }}
          initialValues={{
            number: '',
            dateM: '',
            dateY: '',
            cvv: '',
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
                  {touched.number && errors.number && (
                    <div color="red">{errors.number}</div>
                  )}
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
                  {touched.dateM && errors.dateM && <div color="red">{errors.dateM}</div>}
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
                  {touched.dateY && errors.dateY && <div color="red">{errors.dateY}</div>}
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
                  {touched.cvv && errors.cvv && <div color="red">{errors.cvv}</div>}
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
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default Payment;
