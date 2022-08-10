//Filter ingredients and Measures from api request

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
    finalRatioKeys.forEach((key, i) => ingredients[key] = finalRatioValues[i].trim());

    return {
        name: tempCocktail.strDrink,
        img: tempCocktail.strDrinkThumb,
        ingredients: ingredients,
        id: tempCocktail.idDrink
    }

}


//Sum price of basket items
export const sumPricePerItemHandler = (count, pricePerItem) => {

    const price = pricePerItem.substring(0, 2) - 7 //Getting at least smt, what we can use as price
    const sum = count * (price)

    const correct = sum % count === 0 && sum > 0
    if (correct) {
        return sum + `$`
    } else return <div>
        Error, smt strange was occurred
    </div>


}

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
