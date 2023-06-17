import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const PaymentLayout = ({children}) => {
    const navigate = useNavigate()
    const totalSum = useSelector(state => state.basket.sumPrice)

    console.log('totalSum from paymentLayout: ', totalSum)

    const redirectHandler = () =>{
        if (!totalSum){
            navigate('/Light%20rum', {replace: true})
        }
    }

    useEffect(() =>{
        redirectHandler()
    }, [])

    return (
        <>
            {children}
        </>
    )
}

export default PaymentLayout