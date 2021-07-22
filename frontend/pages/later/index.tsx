import { observer } from 'mobx-react-lite';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React, { useEffect, useState } from 'react'
import Later from '../../components/Later/Later'
import MainLayout from '../../components/MainLayout/MainLayout'
import NonAuth from '../../components/NonAuth/NonAuth'
import authReducer from '../../store/authReducer';
import globalHistoryReducer from '../../store/globalHistoryReducer';
import videoListReducer, { IVideoList } from '../../store/videoListReducer';

const Index:React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
    const list = props.list as IVideoList[]

    useEffect(() => {
        globalHistoryReducer.addUrl("later")
    },[])
    
    return <MainLayout>
        {authReducer.isAuth 
        ?
        <Later items = {list}/>
        : 
        <NonAuth />
       }
    </MainLayout>
}

export const getServerSideProps:GetServerSideProps = async (context) => {
    const response = await videoListReducer.getVideoList("later")

    return {
        props:{ 
            ...response
        }
    }
}

export default observer(Index)