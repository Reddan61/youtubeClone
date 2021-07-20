import React, { ChangeEvent, useState } from "react"
import AddFileIcon from "../svg/AddFileIcon"
import classes from "./Badge.module.scss"


const Badge = () => {
    const [changedImageUrl,setChangedImageUrl] = useState(null)

    const inputHandler = (e:ChangeEvent<HTMLInputElement>) => {
        const extensions = ["image/jpg", "image/jpeg", "image/png"]
        const files = e.target.files
        
        if(files.length !== 1 ) {
            return
        }
        
        if(!extensions.includes(files[0].type)) {
            return
        }
        
        const reader = new FileReader()

        reader.readAsDataURL(files[0])

        reader.onload = () => {
            setChangedImageUrl(reader.result)
        }

        reader.onerror = () => {
            alert("Ошибка загрузки изображения")
        }
    }

    return <div className = {classes.badge}>
        <label className = {classes.badge__label}>
            <input onChange = {inputHandler} type = {"file"} style = {{display:"none"}}/>
                {  changedImageUrl ? 
                    <img  src = {changedImageUrl} width = {"100%"} height = {"100%"}/>
                : 
                    <>
                        <AddFileIcon classModule = {classes.icon__file}/>
                        <span className = {classes.badge__text}>Загрузить значок</span>
                    </>
                }
        </label>
    </div>
}


export default Badge