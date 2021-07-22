import React, { useEffect, useState } from 'react'
import LoginPage from '../../components/Auth/Login';
import router from 'next/router';
import authReducer from '../../store/authReducer';
import { observer } from 'mobx-react-lite';
import globalHistoryReducer from '../../store/globalHistoryReducer';


const Index = () => {

    const [showPage,setShowPage] = useState(false)


    useEffect(() => {
        if(authReducer.isAuth) {
            router.push('/')
        } else {
            setShowPage(true)
        }

        globalHistoryReducer.addUrl("login")
    },[])


    return <>
    {
        showPage &&
            <LoginPage />
    }
    </>
}


export default observer(Index);