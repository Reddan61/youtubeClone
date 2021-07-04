import { Iprops } from "./svgInterfaces";

const ErrorSignIcon:React.FC<Iprops> = ({classModule}) => {
    return <>
        <svg className = {classModule} viewBox = "0 0 22 22">
            <path  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
        </svg>
    </>
}

export default ErrorSignIcon;








