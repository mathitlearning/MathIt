import { Outlet } from "react-router-dom"

import BottomNav from "./Navigation/BottomNav"
import Sidebar from "./Navigation/Sidebar"


function Layout(){

    return (

        <>

            <Outlet/>


            <BottomNav/>

            <Sidebar/>

        </>

    )

}


export default Layout