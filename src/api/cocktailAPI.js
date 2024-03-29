import instance from './axios';

export const cocktailAPI = {
  getCocktailList() {
    return instance.get(`list.php?i=list`).then((res) => res.data.drinks);
  },

  getCocktailById(id) {
    return instance.get(`lookup.php?i=${id}`).then((res) => res);
  },

  getCocktailBeIngredientName(ingredientName) {
    return instance.get(`filter.php?i=${ingredientName}`).then((res) => res);
  },
};
