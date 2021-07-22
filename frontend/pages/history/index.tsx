import { observer } from "mobx-react-lite";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React, { useEffect, useState } from "react"
import History from "../../components/History/History"
import MainLayout from "../../components/MainLayout/MainLayout"
import NonAuth from "../../components/NonAuth/NonAuth"
import authReducer from '../../store/authReducer';
import globalHistoryReducer from "../../store/globalHistoryReducer";
import videoListReducer, { IVideoList } from "../../store/videoListReducer";


const Index:React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
    const list = props.list as IVideoList[]

    useEffect(() => {
        globalHistoryReducer.addUrl("history")
    },[])
    
    return <MainLayout>
        {authReducer.isAuth 
        ?
        <History items = {list}/>
        : 
        <NonAuth />
       }
    </MainLayout>
}

export const getServerSideProps:GetServerSideProps = async (context) => {
    const response = await videoListReducer.getVideoList("history")

    return {
        props:{ 
            ...response
        }
    }
}

export default observer(Index)