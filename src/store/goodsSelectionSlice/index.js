import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {cocktailAPI} from "../../api/cocktailAPI";
import {setIngredientsAndMeasures} from "../../helpers";


export const getCocktailList = createAsyncThunk(
    'cocktails/getCocktailList',
    async (ingredientName) => {
        const response = await cocktailAPI.getCocktailBeIngredientName(ingredientName)
        return response.data.drinks
    }
)


export const getCocktailItem = createAsyncThunk(
    'cocktails/getCocktailItem',
    async (id, {dispatch}) => {
        const response = await cocktailAPI.getCocktailById(id)
        const ingredients = response.data.drinks[0]
        return setIngredientsAndMeasures(ingredients)
    }
)


const goodsSelectionSlice = createSlice({
        name: 'cocktails',
        initialState: {
            cocktailList: [
                {
                    name: 'name from cocktailList',
                    image: 'image from cocktailList',
                    id: 'id from cocktailList',
                }
            ],
            cocktailItem: [
                {
                    name: 'name from cocktailItem',
                    id: 'id from cocktailItem',
                    ingredients: {}
                }
            ],
            basket: [],
            sumPrice: null,
            auth: false,
            status: null,
            error: null,
        },


        reducers: {
            basketAfterReload(state, action) {
                const payload = action.payload
                action.payload
                    ? state.basket = payload
                    : state.basket = state.basket
            },

            fillUpBasket(state, action) {
                const payload = action.payload
                console.log('payload from Slice :', payload)
                console.log('state from fillUpBasket before filter: ', state.basket)

                const exist = state.basket.find(product => product.id === payload.id)
                exist ? console.log('already exist') : console.log('new product')

                if (exist) {
                    state.basket.map(el => el.id === payload.id
                        ? el.count = el.count + 1
                        : el.count)
                } else {
                    state.basket.push({
                        name: payload.name,
                        id: payload.id,
                        image: payload.img,
                        count: 1
                    })
                }

                localStorage.setItem('order', JSON.stringify(state.basket))

            },

            clearAllBasket(state) {
                console.log('We are here after Click Clear')
                localStorage.removeItem('order')
                state.basket = []
            },



            removeBasketItem(state, action) {
                const payload = action.payload
                console.log('state in removeBasketItem: ', state)
                const exist = state.basket.find(product => product.id === payload)
                if (exist){
                    state.basket = state.basket.filter(product => product.id !== payload)
                } else return state.basket

            },


            incrementProductInBasket(state, action) {

                const payload = action.payload
                const exist = state.basket.find(product => product.id === payload.id)
                if (exist) {
                    state.basket.map(el => el.id === payload.id
                        ? el.count = el.count + 1
                        : el.count)
                }
                localStorage.setItem('order', JSON.stringify(state.basket))
            },

            decrementProductInBasket(state, action) {
                const payload = action.payload
                const exist = state.basket.find(product => product.id === payload.id)
                if (exist) {
                    state.basket.map(el => el.id === payload.id
                        ? el.count = el.count - 1
                        : el.count)
                }
                localStorage.setItem('order', JSON.stringify(state.basket))

            },
            sumBasketPrice(state, action) {
                const payload = action.payload
                state.sumPrice = state.sumPrice + payload
            }
        },


        extraReducers: (builder) => {

            builder.addCase(getCocktailList.pending, (state) => {
                state.status = 'pending'
            })
            builder.addCase(getCocktailList.fulfilled, (state, action) => {
                state.cocktailList = action.payload
                state.status = 'fulfilled'
            })
            builder.addCase(getCocktailList.rejected, (state) => {
                state.status = 'rejected'
            })


            builder.addCase(getCocktailItem.pending, (state, action) => {
                state.status = 'pending'
            })
            builder.addCase(getCocktailItem.fulfilled, (state, action) => {
                state.cocktailItem = action.payload
            })
            builder.addCase(getCocktailItem.rejected, (state, action) => {
                state.status = 'rejected'
            })

        }
    }
)

export const {
    clearAllBasket,
    fillUpBasket,
    basketAfterReload,
    decrementProductInBasket,
    incrementProductInBasket,
    sumBasketPrice,
    removeBasketItem
} = goodsSelectionSlice.actions

export default goodsSelectionSlice.reducer

