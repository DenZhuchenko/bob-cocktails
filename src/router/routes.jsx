import AppLayout from '../components/layout/appLayout';
import React from 'react';
import MainLayout from '../components/layout/mainLayout';
import GoodsSelection from '../components/main/goodsSelection';
import Cocktail from '../components/main/goodsSelection/Cocktail/Cocktail';
import Registration from '../components/auth/registration';
import Login from '../components/auth/login';
import Basket from '../components/header/basket/basket';
import Payment from '../components/payment';
import PageNotFound from '../components/pageNotFound';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const navigate = useNavigate();
const totalSum = useSelector((state) => state.basket.sumPrice);

export const publicRoutes = [
  { path: '/', element: <AppLayout /> },
  { path: '/', element: <MainLayout /> },
  { path: ':ingredientName', element: <GoodsSelection /> },
  { path: 'cocktail/:id', element: <Cocktail /> },
  { path: 'basket', element: <Basket /> },
  {
    path: 'payment',
    element: totalSum ? <Payment /> : navigate('/Light%20rum', { replace: true }),
  },
  { path: '*', element: <PageNotFound /> },
  { path: 'registration', element: <Registration /> },
  { path: 'login', element: <Login /> },
  { path: '*', element: navigate('/Light%20rum', { replace: true }) },
];

export const privateRouter = [];
