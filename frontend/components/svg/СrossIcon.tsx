import { Iprops } from "./svgInterfaces";

const CrossIcon:React.FC<Iprops> = ({classModule,...props}) => {
    return <>
        <svg display = 'none'>
                <symbol viewBox="0 0 24 24" id = "cross-icon">
                    <g >
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
                        </path>
                    </g>
                </symbol>
        </svg>
        <svg {...props} className = {classModule}>
            <use xlinkHref='#cross-icon'></use>
        </svg>
    </>
}

export default CrossIcon;