import { Iprops } from "./svgInterfaces";

const ArrowDownIcon:React.FC<Iprops> = ({classModule}) => {
    return <>
        <svg display = 'none'>
                <symbol viewBox="0 0 24 24" id = "arrowDown-icon">
                    <g>
                        <polygon points="12,16.41 5.29,9.71 6.71,8.29 12,13.59 17.29,8.29 18.71,9.71">
                        </polygon>
                    </g>
                </symbol>
        </svg>
        <svg className = {classModule}>
            <use xlinkHref='#arrowDown-icon'></use>
        </svg>
    </>
}
export default ArrowDownIcon;