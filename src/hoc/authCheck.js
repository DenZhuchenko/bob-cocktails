import React from 'react'
import {Navigate} from "react-router";

const AuthCheck = ({children}) => {

  const loggedin = false

    if (!loggedin){
        return <Navigate to={'/login'} />
    }
    return children
}

export default AuthCheck