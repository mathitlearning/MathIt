import { useState } from "react"
import { supabase } from "../services/supabaseClient"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"


function Login() {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")


    async function login() {

        setLoading(true)
        setMessage("")


        const {
            error
        } = await supabase.auth.signInWithPassword({

            email,
            password

        })


        if (error) {

            setMessage(error.message)
            setLoading(false)
            return

        }


        navigate("/")

    }



    async function signup() {

        setLoading(true)
        setMessage("")


        const {
            error
        } = await supabase.auth.signUp({

            email,
            password,

            options: {
                emailRedirectTo:
                    window.location.origin
            }

        })


        if (error) {

            setMessage(error.message)

        } else {

            setMessage(
                "Check your email to confirm your account."
            )

        }


        setLoading(false)

    }



    async function googleLogin() {

        const {
            error
        } = await supabase.auth.signInWithOAuth({

            provider: "google",

            options: {
                redirectTo:
                    window.location.origin
            }

        })


        if (error) {

            setMessage(error.message)

        }

    }



    return (

        <div className="auth-page">


            <div className="auth-card">


                <h1>
                    MathIt
                </h1>


                <input

                    placeholder="Email"

                    value={email}

                    onChange={
                        e => setEmail(e.target.value)
                    }

                />


                <input

                    type="password"

                    placeholder="Password"

                    value={password}

                    onChange={
                        e => setPassword(e.target.value)
                    }

                />



                <button
                    onClick={login}
                    disabled={loading}
                >

                    Login

                </button>



                <button
                    onClick={signup}
                    disabled={loading}
                >

                    Sign Up

                </button>



                <button
                    onClick={googleLogin}
                >

                    Continue with Google

                </button>

                <Link to="/forgot-password">

                    Forgot Password?

                </Link>

                {
                    message &&
                    <p>
                        {message}
                    </p>
                }


            </div>


        </div>

    )

}


export default Login