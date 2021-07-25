import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { ComponentType, useEffect, useState } from "react";
import authReducer from "../../store/authReducer";


export function WithAuth<WP>(Component:ComponentType<WP>) {
    const WithComponent:React.FC<{}> = observer((props) => {
        const [isLoading,setLoading] = useState(true);
        const router = useRouter()

        useEffect(() => {
            (async function() {
                setLoading(true)
                await authReducer.initialUser()
                setLoading(false)
            })()
        },[])

        if(authReducer.isAuth) {   
            router.push('/')
        }
        
        return <Component {...props as WP}/>
    })

    return WithComponent;
}


export default WithAuth