import GoodsSelection from "./components/main/goodsSelection";
import {Route, Routes} from "react-router-dom";
import Cocktail from "./components/main/goodsSelection/Cocktail/Cocktail";
import AppLayout from "./components/layout/appLayout";
import PageNotFound from "./components/pageNotFound";
import Registration from "./components/auth/registration";
import Login from "./components/auth/login";
import MainLayout from "./components/layout/mainLayout";
import Basket from "./components/header/basket/basket";
import Payment from "./components/payment";


const App = () => {




    return (
        <>
            <Routes>
                <Route path={'/'} element={<AppLayout />}>
                    <Route path={'/'} element={<MainLayout />}>
                        <Route path={':ingredientName/*'} element={<GoodsSelection />}/>
                        <Route path={`:ingredientName/:id`} element={<Cocktail/>}/>
                    </Route>

                    <Route path={`registration`} element={<Registration/>}/>
                    <Route path={'test'} element={<p>Test</p>}/>
                    <Route path={`login`} element={<Login />}/>
                    <Route path={'basket'} element={<Basket/>}/>
                    <Route path={'payment'} element={<Payment/>}/>
                    <Route path='*' element={<PageNotFound/>}/>
                </Route>
            </Routes>

        </>
    )
}

export default App;


