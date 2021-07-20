import { Iprops } from "./svgInterfaces";

const AddFileIcon:React.FC<Iprops> = ({classModule,...props}) => {
    return <>
        <svg display = 'none'>
                <symbol viewBox="0 0 24 24" id = "addFile-icon">
                    <g viewBox="0 0 24 24">
                        <path d="M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2h-3zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8h-3zM5 19l3-4 2 3 3-4 4 5H5z"></path>
                        <path d="M0 0h24v24H0z" fill="none"></path>
                    </g>
                </symbol>
        </svg>
        <svg {...props} className = {classModule}>
            <use xlinkHref='#addFile-icon'></use>
        </svg>
    </>
}

export default AddFileIcon;