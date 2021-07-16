import React, { useState } from "react"
import History from "../../components/History/History"
import MainLayout from "../../components/MainLayout/MainLayout"
import NonAuth from "../../components/NonAuth/NonAuth"


const Index = () => {
    const [isAuth,] = useState(true)

    return <MainLayout>
        {isAuth 
        ?
        <History />
        : 
        <NonAuth />
       }
    </MainLayout>
}

export default Index