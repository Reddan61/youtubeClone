import React, { useState } from 'react'
import Later from '../../components/Later/Later'
import MainLayout from '../../components/MainLayout/MainLayout'
import NonAuth from '../../components/NonAuth/NonAuth'

const Index = () => {
    const [isAuth,] = useState(true)

    return <MainLayout>
        {isAuth 
        ?
        <Later />
        : 
        <NonAuth />
       }
    </MainLayout>
}


export default Index