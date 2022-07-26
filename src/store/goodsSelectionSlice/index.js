import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {cocktailAPI} from "../../api/cocktailAPI";
import {setIngredientsAndMeasures} from "../../helpers";
import basket from "../../components/header/basket/basket";

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
            auth: false,
            status: null,
            error: null,
        },


        reducers: {
            basketAfterReload(state, action) {
                action.payload
                    ? state.basket = action.payload
                    : state.basket = state.basket
            },
            fillUpBasket(state, action) {
                console.log('payload from Slice :', action.payload)
                console.log('state from fillUpBasket before filter: ', state.basket)
                state.basket.push({
                    name: action.payload.name,
                    id: action.payload.id,
                    image: action.payload.img,
                    count: 1
                })

                state.basket = Array.from(new Set(state.basket))
                localStorage.setItem('order', JSON.stringify(state.basket))

            },
            clearAllBasket(state){
                console.log('We are here after Click Clear')
                localStorage.removeItem('order')
                state.basket = []
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

export const {clearAllBasket, fillUpBasket, basketAfterReload} = goodsSelectionSlice.actions

export default goodsSelectionSlice.reducer


