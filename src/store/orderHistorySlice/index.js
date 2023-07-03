import { createSlice } from '@reduxjs/toolkit';

const orderHistorySlice = createSlice({
  name: 'orderHistorySlice',
  initialState: {
    orderHistory: [
      {
        name: 'name from cocktailList',
        image: 'image from cocktailList',
        id: 'id from cocktailList',
      },
    ],
  },
  reducers: {
    fillOrderHistory(state, action) {
      const payload = action.payload;
      console.log('payload: ', payload);
      state.orderHistory.push({
        name: payload.name,
        id: payload.id,
        image: payload.img,
      });
    },
  },
});

export const { fillOrderHistory } = orderHistorySlice.actions;
export default orderHistorySlice.reducer;
