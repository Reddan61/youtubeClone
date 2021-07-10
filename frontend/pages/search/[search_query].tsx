import { useRouter }  from 'next/router';
import React, { useEffect } from 'react'
import MainLayout from '../../components/MainLayout/MainLayout';
import SearchVideos from '../../components/SearchVideos/SearchVideos';



const Index = () => {
    //const router = useRouter()
    return <MainLayout>
        <SearchVideos />
    </MainLayout>
}

export default Index;