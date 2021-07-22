import React, { useEffect } from 'react'
import MainLayout from '../../components/MainLayout/MainLayout'
import Profile from '../../components/Profile/Profile'
import { useRouter }  from 'next/router';
import globalHistoryReducer from '../../store/globalHistoryReducer';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import profileReducer, { IProfile } from '../../store/profileReducer';
import dynamic from "next/dynamic"


const Index:React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
    const user = props.user as IProfile

    useEffect(() => {
       globalHistoryReducer.addUrl("profile")
    },[])
    
    return <MainLayout>
        <Profile id = {user.id} avatarSrc = {user.avatarSrc}
            nickname = {user.nickname} subscribersCount = {user.subscribersCount}
            videoList = {user.videoList}
        />
    </MainLayout>
}



export const getServerSideProps:GetServerSideProps = async (context) => {
    const response = await profileReducer.getUser(context.params.id as string)

    return {
        props:{ 
            ...response
        }
    }
}




export default Index