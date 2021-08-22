import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter }  from 'next/router';
import React, { useEffect } from 'react'
import MainLayout from '../../components/MainLayout/MainLayout';
import SearchVideos from '../../components/SearchVideos/SearchVideos';
import globalHistoryReducer from '../../store/globalHistoryReducer';
import videoListReducer, { IVideo } from '../../store/videoListReducer';



const Index:React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
    const videos = props.videos as IVideo[]
    const totalPages = props.totalPages as number
    
    useEffect(() => {
        globalHistoryReducer.addUrl("search")
    },[])
    
    return <MainLayout>
        <SearchVideos  videos = {videos} totalPages = {totalPages}/>
    </MainLayout>
}

export const getServerSideProps:GetServerSideProps = async (context) => {
    const response = await videoListReducer.getMainVideos(1,context.query.search_query as string)

    return {
        props:{ 
            videos:[
                ...response.payload.videos
            ],
            totalPages: response.payload.totalPages
        }
    }
}

export default Index;