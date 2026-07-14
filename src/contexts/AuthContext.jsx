import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"


const AuthContext = createContext()


export function AuthProvider({children}){

    const [user,setUser] = useState(null)
    const [profile,setProfile] = useState(null)
    const [loading,setLoading] = useState(true)


    async function loadUser(){

        const {
            data:{
                session
            }
        } = await supabase.auth.getSession()


        if(!session){

            setUser(null)
            setProfile(null)
            setLoading(false)
            return

        }


        const currentUser = session.user

        setUser(currentUser)


        const {data:userProfile} = await supabase
            .from("users")
            .select("*")
            .eq("id",currentUser.id)
            .single()


        setProfile(userProfile ?? null)

        setLoading(false)

    }



    useEffect(()=>{

        loadUser()


        const {
            data:{
                subscription
            }
        } = supabase.auth.onAuthStateChange(
            async (_event,session)=>{


                if(session){

                    setUser(session.user)

                }else{

                    setUser(null)
                    setProfile(null)

                }

            }
        )


        return ()=>{
            subscription.unsubscribe()
        }


    },[])



    async function logout(){

        await supabase.auth.signOut()

        setUser(null)
        setProfile(null)

    }



    return (

        <AuthContext.Provider
            value={{
                user,
                profile,
                loading,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>

    )

}



export function useAuth(){

    return useContext(AuthContext)

}