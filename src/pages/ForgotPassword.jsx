import { useState } from "react"
import { supabase } from "../services/supabaseClient"

function ForgotPassword() {

    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)
    const [error, setError] = useState("")

    async function handleSubmit(e) {

        e.preventDefault()

        setLoading(true)
        setError("")

        const { error } = await supabase.auth.resetPasswordForEmail(
            email,
            {
                redirectTo:
                    `${window.location.origin}/reset-password`
            }
        )

        setLoading(false)

        if (error) {

            setError(error.message)
            return

        }

        setSent(true)

    }

    if (sent) {

        return (

            <div className="auth-page">

                <h1>Check your email</h1>

                <p>
                    We've sent a password reset link if an account exists for that email.
                </p>

            </div>

        )

    }

    return (

        <div className="auth-page">

            <h1>Forgot Password</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <button disabled={loading}>

                    {loading
                        ? "Sending..."
                        : "Send Reset Link"}

                </button>

            </form>

            {error && <p>{error}</p>}

        </div>

    )

}

export default ForgotPassword