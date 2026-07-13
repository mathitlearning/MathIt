import { useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"

import LessonSection from "../components/Lesson/LessonSection"


function Home(){

    const [lessons,setLessons] = useState([])
    const [profile,setProfile] = useState(null)


    useEffect(()=>{

        loadHome()

    },[])



    async function loadHome(){

        const {
            data:{
                session
            }
        } = await supabase.auth.getSession()


        if(!session) return


        const user = session.user


        const {data:userProfile}= await supabase
            .from("users")
            .select("*")
            .eq("id",user.id)
            .single()


        setProfile(userProfile)



        const {data:lessonData}= await supabase
            .from("lessons")
            .select("*")
            .order("order",{ascending:true})


        setLessons(lessonData || [])

    }



    return(

        <div className="home-page">


            <div className="home-topbar">

                <div>
                    🔥 {profile?.streak ?? 0}
                </div>


                <h2>
                    MathIt
                </h2>


                <div>
                    ⭐ {profile?.xp ?? 0}
                </div>


            </div>



            <h1>
                Discover
            </h1>


            <div>

                <LessonSection
                    title="Popular"
                    lessons={lessons.slice(0,4)}
                />


            </div>


        </div>

    )

}


export default Home