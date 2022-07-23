import GoodsSelection from "./components/main/goodsSelection";
import {Route, Routes} from "react-router-dom";
import Cocktail from "./components/main/goodsSelection/Cocktail/Cocktail";
import AppLayout from "./components/layout/appLayout";
import PageNotFound from "./components/pageNotFound";
import Registration from "./components/auth/registration";
import Login from "./components/auth/login";
import MainLayout from "./components/layout/mainLayout";
import Basket from "./components/header/basket/basket";
import {useState} from "react";


const App = () => {

   const [login, setLogin] = useState(false)

    const loginHandler = (loginInfo) =>{
         setLogin(loginInfo)
    }


    return (
        <>

            <Routes>
                <Route path={'/'} element={<AppLayout />}>

                    <Route path={'/'} element={<MainLayout login={login}/>}>
                        <Route path={':ingredientName/*'} element={<GoodsSelection />}/>
                        <Route path={`:ingredientName/:id`} element={<Cocktail/>}/>
                    </Route>

                    <Route path={`registration`} element={<Registration/>}/>
                    <Route path={'test'} element={<p>Test</p>}/>
                    <Route path={`login`} element={<Login loginHandler={loginHandler} />}/>
                    <Route path={'basket'} element={<Basket/>}/>
                    <Route path='*' element={<PageNotFound/>}/>
                </Route>
            </Routes>

        </>
    )
}

export default App;


