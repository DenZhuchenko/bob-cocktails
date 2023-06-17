import React, {useEffect, useState} from 'react';
import {Box, Text} from '@chakra-ui/react';
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
        <Box pt={'10px'}>
            <CategoriesHandler
                display={{base: 'none', md: 'block'}}
            />

        </Box>
    );
}



