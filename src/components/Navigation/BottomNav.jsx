import { NavLink } from "react-router-dom"


function BottomNav(){

    return (

        <nav className="bottom-nav">

            <NavLink
                to="/home"
                className="nav-item"
            >
                🎓
                <span>
                    Home
                </span>
            </NavLink>


            <NavLink
                to="/profile"
                className="nav-item"
            >
                👤
                <span>
                    Profile
                </span>
            </NavLink>

        </nav>

    )

}


export default BottomNav