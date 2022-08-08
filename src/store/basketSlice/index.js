import {createSlice} from '@reduxjs/toolkit'

const basketSlice = createSlice({

    name: 'auth',
    initialState: {
        sumPrise: null,
        order: null,

        status: null,
        error: null,
    }

})


export const { } = basketSlice.actions
export default basketSlice.reducer
