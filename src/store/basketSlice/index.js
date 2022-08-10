import {createSlice} from '@reduxjs/toolkit'

const basketSlice = createSlice({

    name: 'basket',
    initialState: {
        basket: [],
        sumPrice: null,
        order: null,

        status: null,
        error: null,
    },
    reducers: {

        sumPriceHandler(state) {
            state.basket.map((el) => state.sumPrice = state.sumPrice + el.totalPrice)
        },

        basketAfterReload(state, action) {
            const payload = action.payload
            action.payload
                ? state.basket = payload
                : state.basket = state.basket
        },


        fillUpBasket(state, action) {
            const payload = action.payload

            state.basket.push({
                name: payload.name,
                id: payload.id,
                image: payload.img,
                count: 1,
                price: payload.price,
                totalPrice: payload.totalPrice
            })

            localStorage.setItem('order', JSON.stringify(state.basket))

        },


        clearAllBasket(state) {
            localStorage.removeItem('order')
            state.basket = []
            state.sumPrice = null
        },

        removeBasketItem(state, action) {
            const payload = action.payload
            const exist = state.basket.find(product => product.id === payload)
            if (exist) {
                state.basket = state.basket.filter(product => product.id !== payload)
            } else return state.basket
            localStorage.setItem('order', JSON.stringify(state.basket))
        },

        incrementProductInBasket(state, action) {
            const payload = action.payload
            const exist = state.basket.find(product => product.id === payload.id)
            if (exist) {
                state.basket.map(el => el.id === payload.id
                    ? ((el.count = el.count + 1) && (el.totalPrice = el.price * el.count))
                    : el.count)
            }
            localStorage.setItem('order', JSON.stringify(state.basket))
        },

        decrementProductInBasket(state, action) {
            const payload = action.payload
            const exist = state.basket.find(product => product.id === payload.id)
            if (exist) {
                state.basket.map(el => el.id === payload.id
                    ? ((el.count = el.count - 1) && (el.totalPrice = el.price * el.count))
                    : el.count)
            }
            localStorage.setItem('order', JSON.stringify(state.basket))

        },


        sumBasketPrice(state) {
            state.sumPrice = null
            state.basket.map(
                (item) =>
                    state.sumPrice = state.sumPrice + ((item.id.substring(0, 2) - 7) * item.count)
            )
        }
    }

})


export const {
    incrementProductInBasket,
    decrementProductInBasket,
    basketAfterReload,
    clearAllBasket,
    removeBasketItem,
    sumBasketPrice,
    fillUpBasket,
} = basketSlice.actions
export default basketSlice.reducer
