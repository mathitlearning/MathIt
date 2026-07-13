import { useState } from "react"
import { supabase } from "../services/supabaseClient"
import { useNavigate } from "react-router-dom"

function Login(){

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()


    async function login(){

        const {data,error} =
            await supabase.auth.signInWithPassword({
                email,
                password
            })


        if(error){
            alert(error.message)
            return
        }


        console.log(data.user)
        navigate("/home")

    }


    async function signup(){

        const {error} =
            await supabase.auth.signUp({
                email,
                password
            })


        if(error){
            alert(error.message)
            return
        }


        alert("Check your email")
    }


    return(
        <div className="view">

            <div className="card">

                <h2>MathIt</h2>


                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />


                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />


                <button onClick={login}>
                    Login
                </button>


                <button onClick={signup}>
                    Sign Up
                </button>


            </div>

        </div>
    )
}


export default Login