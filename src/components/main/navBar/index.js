import React, {useEffect, useState} from 'react';
import {Box, Text, useColorModeValue,} from '@chakra-ui/react';
import styles from './navBar.module.css'
import {NavLink} from "react-router-dom";
import {cocktailAPI} from "../../../api/cocktailAPI";


export default function SimpleSidebar() {
    const [categories, setCategories] = useState({})
    useEffect(() => {
        cocktailAPI.getCocktailList().then(res =>
            setCategories(res)
        )
    }, [])


    const CategoriesHandler = () => {
        return Object.keys(categories).map((el) =>

            <NavLink
                to={`${categories[el].strIngredient1}`}>
                <Text

                    className={styles.categories}
                    key={el}
                >
                    {categories[el].strIngredient1}
                </Text>
            </NavLink>
        )
    }


    return (
        <Box
            bg={useColorModeValue('gray.100', 'gray.800')}
            color={useColorModeValue('gray.600', 'gray.100')}
            pt={'10px'}
        >
            <CategoriesHandler
                display={{base: 'none', md: 'block'}}
            />

        </Box>
    );
}


//------------------------


// import React, {useEffect, useState} from 'react'
// import styles from './navBar.module.css'
// import {NavLink} from "react-router-dom";
// import {cocktailAPI} from "../../../api/cocktailAPI";
//
// const NavBar = () => {
//
//
//
//     useEffect(  () =>{
//         cocktailAPI.getCocktailList().then(res =>
//             setCategories(res)
//         )
//     }, [])
//
//
//     const [categories, setCategories] = useState({})
//
//
//     const CategoriesHandler = () => {
//         return Object.keys(categories).map((el) =>
//             <div className={styles.categories} key={el}>
//                 <NavLink
//                     to={`${categories[el].strIngredient1}`}>
//                     {categories[el].strIngredient1}
//                 </NavLink>
//             </div>
//         )
//     }
//
//     return (
//         <div>
//             <CategoriesHandler/>
//         </div>
//     )
// }
//
// export default NavBar












