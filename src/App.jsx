import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom"


import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Login from "./pages/Login"

import Layout from "./components/Layout"



function App(){

    return (

        <BrowserRouter>


            <Routes>


                <Route
                    path="/"
                    element={<Login/>}
                />


                <Route
                    element={
                        <Layout/>
                    }
                >

                    <Route
                        path="/home"
                        element={<Home/>}
                    />


                    <Route
                        path="/profile"
                        element={<Profile/>}
                    />


                </Route>


            </Routes>


        </BrowserRouter>

    )

}


export default App