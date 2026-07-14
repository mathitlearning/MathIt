import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react"

import { supabase } from "../services/supabaseClient"


const AuthContext = createContext()


export function AuthProvider({children}){


    const [user,setUser] = useState(null)

    const [profile,setProfile] = useState(null)

    const [loading,setLoading] = useState(true)

    const [needsOnboarding,setNeedsOnboarding] = useState(false)



    async function loadProfile(authUser){


        if(!authUser){

            setProfile(null)
            setNeedsOnboarding(false)

            return null

        }



        let {
            data:userProfile,
            error
        } = await supabase
            .from("users")
            .select("*")
            .eq(
                "id",
                authUser.id
            )
            .maybeSingle()



        if(error){

            console.error(
                "Profile load error:",
                error
            )

        }



        /*
            Create profile if missing

            Happens for:
            - Email signup
            - Google signup
        */

        if(!userProfile){


            const metadata =
                authUser.user_metadata || {}


            const username =
                metadata.full_name
                ?.replace(/\s/g,"")
                ||
                authUser.email
                ?.split("@")[0]



            const {
                data:newProfile,
                error:createError
            } =
                await supabase
                .from("users")
                .insert({

                    id: authUser.id,

                    username,

                    display_name:
                    metadata.full_name ?? null,

                    avatar_id:
                    "default_1"

                })
                .select()
                .single()



            if(createError){

                console.error(
                    "Profile creation failed:",
                    createError
                )

            }else{

                userProfile =
                    newProfile

            }


        }



        setProfile(userProfile)



        setNeedsOnboarding(
            !userProfile?.display_name
        )


        return userProfile

    }





    async function refreshProfile(){


        if(!user)
            return


        await loadProfile(user)

    }





    async function initialize(){


        const {
            data:{
                session
            }
        } =
        await supabase.auth.getSession()



        if(session){


            setUser(
                session.user
            )


            await loadProfile(
                session.user
            )


        }



        setLoading(false)


    }





    useEffect(()=>{


        initialize()



        const {
            data:{
                subscription
            }
        }
        =
        supabase.auth.onAuthStateChange(
            async(
                event,
                session
            )=>{


                if(session){


                    setUser(
                        session.user
                    )


                    await loadProfile(
                        session.user
                    )


                }else{


                    setUser(null)

                    setProfile(null)

                    setNeedsOnboarding(false)

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

        setNeedsOnboarding(false)

    }





    return (

        <AuthContext.Provider

            value={{

                user,

                profile,

                loading,

                needsOnboarding,

                logout,

                refreshProfile

            }}

        >

            {children}

        </AuthContext.Provider>

    )


}




export function useAuth(){

    return useContext(AuthContext)

}