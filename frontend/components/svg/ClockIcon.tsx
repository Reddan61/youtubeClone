import { Iprops } from "./svgInterfaces";

const ClockIcon:React.FC<Iprops> = ({classModule}) => {
    return <>
        <svg display = 'none'>
                <symbol viewBox="0 0 24 24" id = "clock-icon">
                    <g>
                        <path d="M12 3.67c-4.58 0-8.33 3.75-8.33 8.33s3.75 8.33 8.33 8.33 8.33-3.75 8.33-8.33S16.58 3.67 12 3.67zm3.5 11.83l-4.33-2.67v-5h1.25v4.34l3.75 2.25-.67 1.08z">
                        </path>
                    </g>
                </symbol>
        </svg>
        <svg className = {classModule}>
            <use xlinkHref='#clock-icon'></use>
        </svg>
    </>
}

export default ClockIcon;
