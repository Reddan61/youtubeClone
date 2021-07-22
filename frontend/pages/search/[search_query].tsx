import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter }  from 'next/router';
import React, { useEffect } from 'react'
import MainLayout from '../../components/MainLayout/MainLayout';
import SearchVideos from '../../components/SearchVideos/SearchVideos';
import globalHistoryReducer from '../../store/globalHistoryReducer';
import videoListReducer, { IVideoList } from '../../store/videoListReducer';



const Index:React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
    const list = props.list as IVideoList[]
    
    
    useEffect(() => {
        globalHistoryReducer.addUrl("search")
    },[])
    
    return <MainLayout>
        <SearchVideos items = {list}/>
    </MainLayout>
}

export const getServerSideProps:GetServerSideProps = async (context) => {
    const response = await videoListReducer.getVideoList("search")

    return {
        props:{ 
            ...response
        }
    }
}

export default Index;