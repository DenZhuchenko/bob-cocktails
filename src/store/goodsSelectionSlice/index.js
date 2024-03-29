import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { cocktailAPI } from '../../api/cocktailAPI';
import { setIngredientsAndMeasures } from '../../helpers';
import { signOutUser } from '../../api/firebase';

export const getCocktailList = createAsyncThunk(
  'cocktails/getCocktailList',
  async (ingredientName, { dispatch }) => {
    const response = await cocktailAPI.getCocktailBeIngredientName(ingredientName);
    return response.data.drinks;
  }
);

export const getCocktailItem = createAsyncThunk(
  'cocktails/getCocktailItem',
  async (id, { dispatch, getState }) => {
    const response = await cocktailAPI.getCocktailById(id);
    // console.log('response from getCocktailItem: ', response)
    const ingredients = response.data.drinks[0];
    console.log('ingredients: ', ingredients);
    return setIngredientsAndMeasures(ingredients);
  }
);

export const logoutUser = createAsyncThunk('cocktails/logoutUser', async () => {
  const response = await signOutUser();
  console.log('logged out');
  return response;
});

const goodsSelectionSlice = createSlice({
  name: 'cocktails',
  initialState: {
    cocktailList: [
      {
        name: 'name from cocktailList',
        image: 'image from cocktailList',
        id: 'id from cocktailList',
      },
    ],
    cocktailItem: {
      name: '',
      id: '',
      ingredients: {},
    },
    status: null,
    error: null,
  },

  reducers: {
    clearCocktailCard(state) {
      state.cocktailItem = {
        name: '',
        id: '',
        ingredients: {},
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getCocktailList.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(getCocktailList.fulfilled, (state, action) => {
      state.cocktailList = action.payload;
      state.status = 'fulfilled';
    });
    builder.addCase(getCocktailList.rejected, (state) => {
      state.status = 'rejected';
    });

    builder.addCase(getCocktailItem.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(getCocktailItem.fulfilled, (state, action) => {
      state.cocktailItem = action.payload;
      state.status = 'fulfilled';
    });
    builder.addCase(getCocktailItem.rejected, (state, action) => {
      state.status = 'rejected';
    });

    builder.addCase(logoutUser.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.currentUser = null;
      state.login = false;
      state.status = 'fulfilled';
    });
    builder.addCase(logoutUser.rejected, (state) => {
      state.status = 'rejected';
    });
  },
});

export const { clearCocktailCard } = goodsSelectionSlice.actions;

export default goodsSelectionSlice.reducer;
