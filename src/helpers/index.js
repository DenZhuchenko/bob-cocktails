export const setIngredientsAndMeasures = (tempCocktail) => {

    const asArray = Object.entries(tempCocktail)
    const filtered = asArray.filter(([key, value]) => typeof value === 'string')
    const justStrings = Object.fromEntries(filtered)

    const SortedIngredients = Object.fromEntries(Object.entries(justStrings).filter(([key]) => key.includes('strIngredient')))
    const SortedMeasure = Object.fromEntries(Object.entries(justStrings).filter(([key]) => key.includes('strMeasure')))

    const ingredientValue = Object.values(SortedIngredients)
    const measureValue = Object.values(SortedMeasure)

    let finalRatioKeys = ingredientValue
    let finalRatioValues = measureValue
    let ingredients = {};
    finalRatioKeys.forEach((key, i) => ingredients[key] = finalRatioValues[i]);

    console.log(`ingredients: `, ingredients)


    return {
        name: tempCocktail.strDrink,
        img: tempCocktail.strDrinkThumb,
        ingredients: ingredients,
        id: tempCocktail.idDrink
    }

}