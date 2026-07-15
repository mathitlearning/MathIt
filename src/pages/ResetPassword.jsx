import { useState } from "react"
import { supabase } from "../services/supabaseClient"
import { useNavigate } from "react-router-dom"

function ResetPassword() {

    const navigate = useNavigate()

    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    async function handleSubmit(e) {

        e.preventDefault()

        if (password !== confirm) {

            setError("Passwords do not match.")
            return

        }

        setLoading(true)

        const { error } =
            await supabase.auth.updateUser({

                password

            })

        setLoading(false)

        if (error) {

            setError(error.message)
            return

        }

        alert("Password updated!")

        navigate("/home")

    }

    return (

        <div className="auth-page">

            <h1>Create New Password</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirm}
                    onChange={(e)=>setConfirm(e.target.value)}
                />

                <button disabled={loading}>

                    {loading
                        ? "Saving..."
                        : "Update Password"}

                </button>

            </form>

            {error && <p>{error}</p>}

        </div>

    )

}

export default ResetPassword