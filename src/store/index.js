import { configureStore } from '@reduxjs/toolkit';
import cocktailReducer from './goodsSelectionSlice/index';
import authReducer from './authSlice/index';
import basketReducer from './basketSlice/index';
import thunk from 'redux-thunk';
import orderHistorySlice from './orderHistorySlice';

export default configureStore({
  reducer: {
    cocktailList: cocktailReducer,
    auth: authReducer,
    basket: basketReducer,
    orderHistorySlice: orderHistorySlice,
  },
  middleware: [thunk],
});
