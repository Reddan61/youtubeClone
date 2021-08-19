import React, { useEffect } from 'react'
import MainLayout from '../../components/MainLayout/MainLayout'
import Profile from '../../components/Profile/Profile'
import { useRouter }  from 'next/router';
import globalHistoryReducer from '../../store/globalHistoryReducer';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import profileReducer, { IProfile } from '../../store/profileReducer';
import { IVideo } from '../../store/videoListReducer';


const Index:React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
    const user = {...props.profile} as IProfile
    const videos = [ ...props.videos ] as IVideo[]
    const totalPages = props.totalPages

    useEffect(() => {
       globalHistoryReducer.addUrl("profile")
    },[])
    
    return <MainLayout>
        <Profile profile = {user} videos = {videos} totalPages = {totalPages}
        />
    </MainLayout>
}



export const getServerSideProps:GetServerSideProps = async (context) => {
    const profile = await profileReducer.getUser(context.params.id as string)
    const videos = await profileReducer.getVideoProfile(1)

    if(profile.message === "error" || videos.message === "error") {
        return {
            redirect: {
                destination: "/"
            },
            props: {}
        }
    }

    return {
        props:{ 
            profile:{
                ...profile.payload
            },
            videos: videos.payload.videos,
            totalPages:videos.payload.totalPages
        }
    }
}




export default Index