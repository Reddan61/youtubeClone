
interface IProps {
    classModule:string,
    onClick?: () => any
}

const SaveIcon:React.FC<IProps> = ({classModule,onClick}) => {
    return <>
        <svg display = 'none'>
                <symbol viewBox="0 0 24 24" id = "save-icon">
                    <g>
                        <path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z">
                        </path>
                    </g>
                </symbol>
        </svg>
        <svg  onClick = {onClick} className = {classModule}>
            <use xlinkHref='#save-icon'></use>
        </svg>
    </>
}

export default SaveIcon;