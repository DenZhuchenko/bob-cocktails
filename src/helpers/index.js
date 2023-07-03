// Filter ingredients and Measures from api request

export const setIngredientsAndMeasures = (tempCocktail) => {
  const dataAsArray = Object.entries(tempCocktail);
  const filtered = dataAsArray.filter(([key, value]) => typeof value === 'string');
  const justStrings = Object.fromEntries(filtered);

  const SortedIngredients = Object.fromEntries(
    Object.entries(justStrings).filter(([key]) => key.includes('strIngredient'))
  );
  const SortedMeasure = Object.fromEntries(
    Object.entries(justStrings).filter(([key]) => key.includes('strMeasure'))
  );

  const ingredientValue = Object.values(SortedIngredients);
  const measureValue = Object.values(SortedMeasure);

  const finalRatioKeys = ingredientValue;

  const finalRatioValues = measureValue;

  const ingredients = {};
  finalRatioKeys.forEach((key, i) => (ingredients[key] = finalRatioValues[i].trim()));

  return {
    name: tempCocktail.strDrink,
    img: tempCocktail.strDrinkThumb,
    ingredients: ingredients,
    id: tempCocktail.idDrink,
    method: tempCocktail.strInstructions,
    price: tempCocktail.idDrink.substring(0, 2) - 7,
  };
};

// In case if we want increment the button at goodsSelection
// const exist = state.basket.find(product => product.id === payload.id)
// if (exist) {
//     state.basket.map(el => el.id === payload.id
//         ? el.count = el.count + 1
//         : el.count)
// } else                 state.basket.push({
//                     name: payload.name,
//                     id: payload.id,
//                     image: payload.img,
//                     count: 1,
//                     price: payload.id.substring(0, 2) - 7,
//                     totalPrice: parseInt(payload.id.substring(0, 2) - 7) *  state.count
//                 })
//             // }

// const addToBasket = (name, id, img) =>{
//
//     const dispatch = useDispatch()
//
//     dispatch(fillUpBasket(
//         {
//             name: name,
//             id: id,
//             img: img,
//             count: 1,
//             price: id.substring(0, 2) - 7,
//             totalPrice: Number(id.substring(0, 2) - 7)
//         }
//     ))
// }
