import { observer } from 'mobx-react-lite';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React, { useEffect, useState } from 'react'
import Liked from '../../components/Liked/Liked'
import MainLayout from '../../components/MainLayout/MainLayout'
import NonAuth from '../../components/NonAuth/NonAuth'
import authReducer from '../../store/authReducer';
import globalHistoryReducer from '../../store/globalHistoryReducer';
import videoListReducer, { IVideoList } from '../../store/videoListReducer';

const Index:React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
    const list = props.list as IVideoList[]
    
    useEffect(() => {
        globalHistoryReducer.addUrl("liked")
    },[])

    return <MainLayout>
        {authReducer.isAuth 
        ?
        <Liked  items = {list}/>
        : 
        <NonAuth />
       }
    </MainLayout>
}

export const getServerSideProps:GetServerSideProps = async (context) => {
    const response = await videoListReducer.getVideoList("liked")

    return {
        props:{ 
            ...response
        }
    }
}

export default observer(Index)