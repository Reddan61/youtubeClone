import { useEffect, useRef, useState } from "react";
import classes from "./prompt.module.scss"

const Prompt = () => {
    const [text,setText] = useState<null | string>(null)
    const divRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        let oldClientX = 0;
        let oldClientY = 0;
        window.onmousemove = (e:MouseEvent) => {
            const target = e.target as Element;
            let timeOut = null as ReturnType<typeof setTimeout> | null;
            oldClientX = e.clientX;
            oldClientY = e.clientY;
            if(target) {
                if(target.classList.contains("showTitle")) {
                    timeOut = setTimeout(() => {
                        if(oldClientX === e.clientX && oldClientY === e.clientY) {
                            setText(target.innerHTML)
                            divRef.current.style.top = e.clientY + 20  + "px"
                            divRef.current.style.left = e.clientX + 20 + "px"
                            divRef.current.style.display = "block"
                        } else {
                            window.clearTimeout(timeOut)
                        }
                        
                    },1500)
                } else {
                    window.clearTimeout(timeOut)
                    divRef.current.style.display = "none"
                }
            }
        }
    })
    return <div ref = {divRef} className = {classes.prompt}>
        <span>{text}</span>
    </div>
}


export default Prompt;