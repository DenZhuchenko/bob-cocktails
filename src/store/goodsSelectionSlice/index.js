import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
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
    async (id,{dispatch}) =>{
        const response = await cocktailAPI.getCocktailById(id)
        const ingredients = response.data.drinks[0]
        const handleIngredients = setIngredientsAndMeasures(ingredients)
        return handleIngredients
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
        basket: [{
            name: 'name from basket',
            image: 'image from basket',
            id: 'id from basket',
        }],
        auth: false,
        status: null,
        error: null,
    },


    reducers: {


    },

    extraReducers:(builder) => {

        builder.addCase(getCocktailList.pending, (state) =>{
            state.status = 'pending'
        })
        builder.addCase(getCocktailList.fulfilled, (state, action) =>{
            state.cocktailList = action.payload
            state.status = 'fulfilled'
        })
        builder.addCase(getCocktailList.rejected, (state) =>{
            state.status = 'rejected'
        })


        builder.addCase(getCocktailItem.pending, (state, action) =>{
            state.status = 'pending'
        })
        builder.addCase(getCocktailItem.fulfilled, (state, action) =>{
            state.cocktailItem = action.payload
        })
        builder.addCase(getCocktailItem.rejected, (state, action) =>{
            state.status = 'rejected'
        })

    }
}
)

export const {createBasket, createCocktailItem, createCocktailList} = goodsSelectionSlice.actions

export default goodsSelectionSlice.reducer


