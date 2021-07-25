import React, { useEffect, useState } from 'react'
import LoginPage from '../../components/Auth/Login';
import globalHistoryReducer from '../../store/globalHistoryReducer';


const Index = () => {
    const [showPage,setShowPage] = useState(false)


    useEffect(() => {
        globalHistoryReducer.addUrl("login")
        setShowPage(true)
    },[])


    return <>
    {
        showPage &&
            <LoginPage />
    }
    </>
}


export default Index;