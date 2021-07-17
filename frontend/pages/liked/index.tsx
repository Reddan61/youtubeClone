import React, { useState } from 'react'
import Liked from '../../components/Liked/Liked'
import MainLayout from '../../components/MainLayout/MainLayout'
import NonAuth from '../../components/NonAuth/NonAuth'

const Index = () => {
    const [isAuth,] = useState(true)

    return <MainLayout>
        {isAuth 
        ?
        <Liked />
        : 
        <NonAuth />
       }
    </MainLayout>
}


export default Index