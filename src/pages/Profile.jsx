import { useAuth } from "../contexts/AuthContext"

function Profile() {

    const { logout } = useAuth()

    return (

        <div>

            <h1>
                Profile
            </h1>


            <p>
                User settings will go here.
            </p>

            <button
                onClick={logout}
            >
                Logout
            </button>


        </div>

    )

}


export default Profile