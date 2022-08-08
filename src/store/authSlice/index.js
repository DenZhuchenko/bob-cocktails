import {createSlice} from '@reduxjs/toolkit'

const authSlice = createSlice({

    name: 'auth',
    initialState: {
        currentUser: null,
        order: null,

        status: null,
        error: null,
    }

})


export const { } = authSlice.actions
export default authSlice.reducer
