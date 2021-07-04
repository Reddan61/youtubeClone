import React from "react"
import { Iprops } from "./svgInterfaces";

const BurgerIcon:React.FC<Iprops> = ({classModule}) => {
    return <>
        <svg display = 'none'>
                <symbol  viewBox="0 0 24 24" id = "burger-icon">
                    <g>
                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z">
                        </path>
                    </g>
                </symbol>
        </svg>
        <svg className = {classModule}>
            <use xlinkHref='#burger-icon'></use>
        </svg>
    </>
}

export default BurgerIcon;