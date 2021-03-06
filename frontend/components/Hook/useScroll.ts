import React, { useCallback, useEffect, useRef, useState } from "react"



export const useScroll = (callback:() => Promise<void | any>) => {
    const [isLoading,setLoading] = useState(false)
    const isFirstRef = useRef(true)
    const requestRef = useRef(false)
    let oldPercent = 0
    let oldScrollPosition = 0
  
    const callbackRef = useRef(null)
    callbackRef.current = callback
   
    const addNewVideosOnScroll = useCallback(async (e:any) => {
        //При первой загрузке страницы скролл в топ       
        if(isFirstRef.current) {
            setTimeout(() => {
                document.documentElement.scrollTo(0,0)
                isFirstRef.current = false
            },50)
           return
        }

        //Процент прокрутки
        const percent = window.scrollY/(document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100
        //Определяет направление прокрутки
        const isScrolledDown =  window.scrollY > oldScrollPosition ? true : false
        oldScrollPosition = window.scrollY
        
        if(percent >= 80 && requestRef.current === false && percent !== oldPercent && isScrolledDown) {
            oldPercent = percent;
            requestRef.current = true;
            setLoading(true)

            await callbackRef.current()

            requestRef.current = false;
            setLoading(false)
        }
        
    },[])
  
    useEffect(() => {
        window.addEventListener("scroll",addNewVideosOnScroll)
        return () => {            
            window.removeEventListener("scroll",addNewVideosOnScroll)
        }
    },[])

    return [isLoading]
}