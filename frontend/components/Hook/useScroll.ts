import React, { useCallback, useEffect, useRef, useState } from "react"



export const useScroll = () => {
    const [isLoading,setLoading] = useState(false);
    const requestRef = useRef(false);
    let oldPercent = 0;
    let oldScrollPosition = 0;

    const addNewVideosOnScroll = useCallback((e:Event) => {
        //Процент прокрутки
        const percent = window.scrollY/(document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100
        //Определяет направление прокрутки
        const isScrolledDown =  window.scrollY > oldScrollPosition ? true : false
        oldScrollPosition = window.scrollY
        
        if(percent >= 80 && requestRef.current === false && percent !== oldPercent && isScrolledDown) {
            oldPercent = percent;
            requestRef.current = true;
            setLoading(true)
            //Должно после ответа api = false
            //Сделать что если на сервере нет больше контента то isloading всегда false
            setTimeout(() => {
                requestRef.current = false;
                setLoading(false)
            },1000)
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