import AppLayout from '../components/layout/appLayout';
import React from 'react';
import MainLayout from '../components/layout/mainLayout';
import GoodsSelection from '../components/main/goodsSelection';
import Cocktail from '../components/main/goodsSelection/Cocktail/Cocktail';
import AuthLayout from '../components/auth/authLayout';
import Registration from '../components/auth/registration';
import Login from '../components/auth/login';
import Basket from '../components/header/basket/basket';
import PaymentLayout from '../components/payment/paymentLayout';
import Payment from '../components/payment';
import PageNotFound from '../components/pageNotFound';

export const publicRoutes = [
  { path: '/', element: <AppLayout /> },
  { path: '/', element: <MainLayout /> },
  { path: ':ingredientName', element: <GoodsSelection /> },
  { path: 'cocktail/:id', element: <Cocktail /> },
  {
    path: 'registration',
    element: (
      <AuthLayout>
        <Registration />
      </AuthLayout>
    ),
  },
  {
    path: 'login',
    element: (
      <AuthLayout>
        <Login />
      </AuthLayout>
    ),
  },
  { path: 'basket', element: <Basket /> },
  {
    path: 'payment',
    element: (
      <PaymentLayout>
        <Payment />
      </PaymentLayout>
    ),
  },
  { path: '*', element: <PageNotFound /> },
];

export const privateRouter = [];
