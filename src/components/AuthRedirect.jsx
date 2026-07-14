import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"


export default function AuthRedirect(){

    const {
        user,
        loading,
        needsOnboarding
    } = useAuth()


    if(loading){
        return <h2>Loading...</h2>
    }


    if(!user){
        return <Navigate to="/login"/>
    }


    if(needsOnboarding){
        return <Navigate to="/onboarding"/>
    }


    return <Navigate to="/home"/>

}