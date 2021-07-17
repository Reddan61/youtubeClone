import React, { useEffect, useState } from 'react'
import LoginPage from '../../components/Auth/Login';
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
            <LoginPage />
    }
    </>
}


export default Index;