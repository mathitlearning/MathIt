import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { supabase } from "../services/supabaseClient"


const avatars = [
    {
        id: "default_1",
        src: "/assets/avatars/avatar1.png"
    },
    {
        id: "default_2",
        src: "/assets/avatars/avatar2.png"
    },
    {
        id: "default_3",
        src: "/assets/avatars/avatar3.png"
    },
    {
        id: "default_4",
        src: "/assets/avatars/avatar4.png"
    }
]


function Onboarding() {

    const navigate = useNavigate()

    const {
        user,
        refreshProfile
    } = useAuth()


    const [step, setStep] = useState(1)

    const [username, setUsername] = useState(
        user?.email?.split("@")[0] ?? ""
    )

    const [displayName, setDisplayName] = useState(
        user?.email?.split("@")[0] ?? ""
    )

    const [avatar, setAvatar] = useState("default_1")

    const [saving, setSaving] = useState(false)



    async function finish() {

        if (!user) return


        setSaving(true)


        const {
            error
        } = await supabase
            .from("users")
            .update({

                username,

                display_name:
                    displayName,

                avatar_id:
                    avatar

            })
            .eq(
                "id",
                user.id
            )


        if (error) {

            console.error(error)
            setSaving(false)
            return

        }


        await refreshProfile()

        navigate("/home")

    }



    return (

        <div className="onboarding-page">


            <div className="onboarding-card">


                {
                    step === 1 && (

                        <>

                            <h1>
                                Choose a username
                            </h1>


                            <input

                                value={username}

                                onChange={
                                    e =>
                                        setUsername(e.target.value)
                                }

                                placeholder="Username"

                            />


                            <button
                                onClick={() => setStep(2)}
                            >

                                Next

                            </button>

                        </>

                    )
                }



                {
                    step === 2 && (

                        <>

                            <h1>
                                What should we call you?
                            </h1>


                            <input

                                value={displayName}

                                onChange={
                                    e =>
                                        setDisplayName(e.target.value)
                                }

                                placeholder="Display name"

                            />


                            <button
                                onClick={() => setStep(3)}
                            >

                                Next

                            </button>


                        </>

                    )
                }



                {
                    step === 3 && (

                        <>

                            <h1>
                                Pick an avatar
                            </h1>


                            <div className="avatars">

                                {
                                    avatars.map(item => (

                                        <img

                                            key={item.id}

                                            src={item.src}

                                            className={
                                                avatar === item.id
                                                    ? "selected"
                                                    : ""
                                            }

                                            onClick={() =>
                                                setAvatar(item.id)
                                            }

                                        />

                                    ))
                                }

                            </div>



                            <button

                                onClick={finish}

                                disabled={saving}

                            >

                                {
                                    saving
                                        ? "Saving..."
                                        : "Finish"
                                }

                            </button>


                        </>

                    )
                }


            </div>


        </div>

    )

}


export default Onboarding