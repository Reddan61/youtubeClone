import { Iprops } from "./svgInterfaces";

const ArrowBackIcon:React.FC<Iprops> = ({classModule}) => {
    return <>
        <svg display = 'none'>
                <symbol viewBox="0 0 24 24" id = "arrowBack-icon">
                    <g mirror-in-rtl="">
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z">
                        </path>
                    </g>
                </symbol>
        </svg>
        <svg className = {classModule}>
            <use xlinkHref='#arrowBack-icon'></use>
        </svg>
    </>
}


export default ArrowBackIcon;