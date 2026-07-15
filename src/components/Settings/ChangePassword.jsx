import {
    useState
} from "react"

import {
    supabase
} from "../../services/supabaseClient"

import {
    validatePassword
} from "../../utils/passwordValidation"

import PasswordRequirements from "../auth/PasswordRequirements"


function ChangePassword() {


    const [
        password,
        setPassword
    ] = useState("")


    const [
        confirmPassword,
        setConfirmPassword
    ] = useState("")


    const [
        message,
        setMessage
    ] = useState("")


    const [
        loading,
        setLoading
    ] = useState(false)



    async function handleSubmit(e) {

        e.preventDefault()


        setMessage("")

        const validation = validatePassword(password)


        if (!validation.valid) {

            setMessage(
                validation.errors[0]
            )

            return

        }

        if (password !== confirmPassword) {

            setMessage(
                "Passwords do not match."
            )

            return

        }



        setLoading(true)



        const {
            error
        } =
            await supabase.auth.updateUser({

                password

            })



        setLoading(false)



        if (error) {

            setMessage(
                error.message
            )

            return

        }



        setPassword("")
        setConfirmPassword("")


        setMessage(
            "Password updated successfully!"
        )

    }




    return (

        <form
            onSubmit={handleSubmit}
        >

            <PasswordRequirements
                password={password}
            />

            <input

                type="password"

                placeholder="New password"

                value={password}

                onChange={
                    e => setPassword(e.target.value)
                }

            />



            <input

                type="password"

                placeholder="Confirm new password"

                value={confirmPassword}

                onChange={
                    e => setConfirmPassword(e.target.value)
                }

            />


            <button
                disabled={loading}
            >

                {
                    loading
                        ?
                        "Updating..."
                        :
                        "Change Password"
                }

            </button>



            {
                message &&
                <p>
                    {message}
                </p>
            }


        </form>

    )

}


export default ChangePassword