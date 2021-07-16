import React, { useState } from "react"
import MainLayout from "../../components/MainLayout/MainLayout";
import NonAuth from "../../components/NonAuth/NonAuth";
import Subscribers from "../../components/Subscribers/Subscribers";

const Index = () => {
    const [isAuth,] = useState(true)
    return <MainLayout>
        {isAuth 
        ?
        <Subscribers/>
        :
        <NonAuth />
    }
    </MainLayout>
}


export default Index;