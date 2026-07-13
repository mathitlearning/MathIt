import { NavLink } from "react-router-dom"


function Sidebar(){

    return (

        <nav className="sidebar-nav">


            <div className="sidebar-logo">
                MathIt
            </div>


            <NavLink
                to="/home"
                className="nav-item"
            >
                🎓 Home
            </NavLink>


            <NavLink
                to="/profile"
                className="nav-item"
            >
                👤 Profile
            </NavLink>


        </nav>

    )

}


export default Sidebar