import React from 'react'
import type { AppProps /*, AppContext */ } from 'next/app'
import Head from 'next/head'
import { BaseSyntheticEvent, SyntheticEvent, useEffect, useRef } from 'react'
import "../styles/main.scss"
import Prompt from '../components/Prompt/Prompt'

export default function App({Component, pageProps}:AppProps) {
    return <div style = {{
        width:"100%",
        display:"flex",
        alignItems:"center",
        flexDirection:"column"
    }}>
        <Head>
            <meta name = 'viewport' 
            content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'/>
            <title>Youtube Clone</title>
        </Head>
        <Prompt />
        <Component {...pageProps} />
    </div>
}