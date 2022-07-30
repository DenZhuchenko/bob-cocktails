import React from 'react'
import {NavLink} from "react-router-dom";
import {Button, IconButton} from "@chakra-ui/react";
import {CheckCircleIcon} from "@chakra-ui/icons";
import {fillUpBasket} from "../../store/goodsSelectionSlice";

const CardButton = (props) => {
    const {info} = props
    const {idDrink, strDrink, strDrinkThumb } = info

    const existInBasket = basket.find(product => product.id === idDrink)

    return (
        <> {
            existInBasket
                ? <NavLink to={'/basket'}>
                    <IconButton
                        p={'1rem'}
                        bg={'green.200'}
                        aria-label="More server options"
                        variant="solid"
                        w="fit-content"
                        icon={<CheckCircleIcon/>}
                    />
                </NavLink>
                : <Button onClick={() => {

                    dispatch(fillUpBasket(
                        {
                            name: strDrink,
                            id: idDrink,
                            img: strDrinkThumb,
                            count: 1
                        }
                    ))
                }}>
                    Add to Basket</Button>
        }
        </>
    )
}

export default CardButton