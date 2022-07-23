import React, {useEffect, useState} from 'react'
import styles from './navBar.module.css'
import {NavLink} from "react-router-dom";
import {cocktailAPI} from "../../../api/cocktailAPI";

const NavBar = () => {



    useEffect(  () =>{
        cocktailAPI.getCocktailList().then(res =>
            setCategories(res)
        )
    }, [])


    const [categories, setCategories] = useState({})


    const CategoriesHandler = () => {
        return Object.keys(categories).map((el) =>
            <div className={styles.categories} key={el}>
                    <NavLink
                        to={`${categories[el].strIngredient1}`}>
                        {categories[el].strIngredient1}
                    </NavLink>
            </div>
        )
    }

    return (
        <div>
            <CategoriesHandler/>
        </div>
    )
}

export default NavBar