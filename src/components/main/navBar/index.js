import React, {useEffect, useState} from 'react';
import {Box, Text, useColorModeValue,} from '@chakra-ui/react';
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
        return Object.keys(categories).map((el, key) =>
            <Box
                p={'0 10px 10px 10px'}
                key={key + Math.random()}
            >
                <NavLink
                    to={`${categories[el].strIngredient1}`}>
                    <Text
                        textAlign={'center'}
                        key={el}
                        p={'10px'}
                        border={'2px solid grey'}
                        borderRadius={'5px'}
                        fontSize={'20'}
                    >
                        {categories[el].strIngredient1}
                    </Text>
                </NavLink>
            </Box>
        )
    }


    return (
        <Box
            // bg={useColorModeValue('orange.200', 'gray.800')}
            // color={useColorModeValue('gray.600', 'gray.100')}
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












