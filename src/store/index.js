import {configureStore} from '@reduxjs/toolkit'
import cocktailReducer from './goodsSelectionSlice/index'

export default configureStore({
        reducer: {
            cocktailList: cocktailReducer,
        },
    }
)
