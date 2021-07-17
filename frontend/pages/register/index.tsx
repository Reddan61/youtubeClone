import React, { useEffect, useState } from 'react'
import Register from '../../components/Auth/Register';
import router from 'next/router';


const Index = () => {
    const [isAuth] = useState(true)
    const [showPage,setShowPage] = useState(false)

    useEffect(() => {
        if(isAuth) {
            router.push('/')
        } else {
            setShowPage(true)
        }
    },[])


    return <>
    {
        showPage &&
        <Register />
    }
    </>
}


export default Index;