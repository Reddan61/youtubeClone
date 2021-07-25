import React, { useEffect, useState } from 'react'
import Register from '../../components/Auth/Register';
import router from 'next/router';
import { observer } from 'mobx-react-lite';
import authReducer from '../../store/authReducer';
import globalHistoryReducer from '../../store/globalHistoryReducer';

const Index = () => {
    const [showPage,setShowPage] = useState(false)

    useEffect(() => {
        globalHistoryReducer.addUrl("register")
        setShowPage(true)
    },[])


    return <>
        {
            showPage &&
            <Register />
        }
    </>
}


export default Index;