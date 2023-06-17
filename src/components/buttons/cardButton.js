import {useDispatch, useSelector} from "react-redux";
import {fillUpBasket} from "../../store/basketSlice";

const AddToBasket = (props) => {
    const {idDrink, strDrink, strDrinkThumb} = props
    const dispatch = useDispatch()
    const basket = useSelector(state => state.basket.basket)
    const existInBasket = basket.find(product => product.id === idDrink)

    if(existInBasket){
        dispatch(fillUpBasket(
            {
                name: strDrink,
                id: idDrink,
                img: strDrinkThumb,
                count: 1
            }
        ))
    }

}

export default AddToBasket