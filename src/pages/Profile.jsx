import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"

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

            <Link to="/settings">

                Settings

            </Link>


        </div>

    )

}


export default Profile