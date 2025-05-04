import { BrowserRouter, Route, Routes } from "react-router-dom"
import {MainPage} from "../Components/MainPage/MainPage"
import {UserAuth} from "../Components/Auth/UserAuth"
import {UserSignup} from '../Components/Auth/UserSignup'
import { UserDashboard } from "Components/Dashboard/User-Dashboard"

export const AppRouter: React.FC = () =>{
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element = {<MainPage/>} />
            <Route path="login" element = {<UserAuth/>} />
            <Route path="Signup" element = {<UserSignup/>}/>
            <Route path="dashboard" element= {<UserDashboard/>}/>
        </Routes>
        </BrowserRouter>
    )

}