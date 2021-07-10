import { Iprops } from "./svgInterfaces";

const LoaderIcon:React.FC<Iprops> = ({classModule}) => {
    return <>
        <svg display = 'none'>
                <symbol viewBox="0 0 100 100" id = "loader-icon">
                    <g>
                        <circle cx="50" cy="50" fill="none" stroke="#b1bbbc" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138">
                            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                        </circle>
                    </g>
                </symbol>
        </svg>
        <svg className = {classModule}>
            <use xlinkHref='#loader-icon'></use>
        </svg>
    </>
}
export default LoaderIcon;