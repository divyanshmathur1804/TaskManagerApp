import { BrowserRouter, Route, Routes } from "react-router-dom"
import {MainPage} from "../Components/MainPage/MainPage"
import {UserAuth} from "../Components/Auth/UserAuth"
import {UserSignup} from '../Components/Auth/UserSignup'
import { UserDashboard } from "Components/Dashboard/User-Dashboard"
import ProtectedRoute from "Components/Auth/ProtectedRoute"
import { AddTeams } from "Components/Teams/AddTeams"

export const AppRouter: React.FC = () =>{
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element = {<MainPage/>} />
            <Route path="login" element = {<UserAuth/>} />
            <Route path="Signup" element = {<UserSignup/>}/>
            <Route element = {<ProtectedRoute/>}>
             <Route path="dashboard" element= {<UserDashboard/>}/>
             <Route path="teams" element = {<AddTeams/>}/>
             </Route>
        </Routes>
        </BrowserRouter>
    )

}