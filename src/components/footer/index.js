import React from 'react'
import {Button} from "@chakra-ui/react";
import {storage} from "../../api/firebase";


const Footer = () =>{

    return(
        <div>
            <Button onClick={()=>console.log('storage: ', storage)}>TEST BUTTON</Button>
        </div>
    )
}

export default Footer