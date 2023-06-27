import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppLayout from '../layout/appLayout';
import MainLayout from '../layout/mainLayout';
import GoodsSelection from '../main/goodsSelection';
import Cocktail from '../main/goodsSelection/Cocktail/Cocktail';
import AuthLayout from '../auth/authLayout';
import Registration from '../auth/registration';
import Login from '../auth/login';
import Basket from '../header/basket/basket';
import PaymentLayout from '../payment/paymentLayout';
import Payment from '../payment';
import PageNotFound from '../pageNotFound';

const RouterPage = () => {
  return (
    <Routes>
      <Route path={'/'} element={<AppLayout />}>
        <Route path={'/'} element={<MainLayout />}>
          <Route path={':ingredientName'} element={<GoodsSelection />} />
          <Route path={`cocktail/:id`} element={<Cocktail />} />
        </Route>

        <Route
          path={`registration`}
          element={
            <AuthLayout>
              <Registration />
            </AuthLayout>
          }
        />
        <Route
          path={`login`}
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />

        <Route path={'basket'} element={<Basket />} />
        <Route
          path={'payment'}
          element={
            <PaymentLayout>
              <Payment />
            </PaymentLayout>
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default RouterPage;
