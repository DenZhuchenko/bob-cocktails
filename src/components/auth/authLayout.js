import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const AuthLayout = ({children}) => {

    const navigate = useNavigate()

    const client = useSelector(state => state.auth.currentUser)

    console.log('client: ', client)

    const test = () => {
        if (client !== null) {
            navigate('/Light%20rum', {replace: true})
        }
    }

    useEffect(() => {

        console.log('Were at useEffect authLayout')
        test()

    }, [client])

    return <>
        {children}
    </>

}

export default AuthLayout
