import React from 'react'
import MainLayout from '../../components/MainLayout/MainLayout'
import Profile from '../../components/Profile/Profile'
import { useRouter }  from 'next/router';



const Index = () => {
    const router = useRouter()
    
    return <MainLayout>
        <Profile id = {router.query.id}/>
    </MainLayout>
}

export default Index