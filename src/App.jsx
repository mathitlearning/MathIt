import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom"


import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import Onboarding from "./pages/Onboarding"

import Layout from "./components/Layout"
import ProtectedRoute from "./components/ProtectedRoute"
import AuthRedirect from "./components/AuthRedirect"


function App() {

    return (

        <BrowserRouter>


            <Routes>

                <Route
                    path="/"
                    element={<AuthRedirect />}
                />

                <Route
                    path="/onboarding"
                    element={<Onboarding />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />


                <Route
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >

                    <Route
                        path="/home"
                        element={<Home />}
                    />


                    <Route
                        path="/profile"
                        element={<Profile />}
                    />


                </Route>


            </Routes>


        </BrowserRouter>

    )

}


export default App