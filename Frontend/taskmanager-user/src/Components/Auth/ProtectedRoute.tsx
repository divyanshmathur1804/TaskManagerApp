import { useTaskManagerContext } from "Context/TaskManagerContext"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = () => {
    const {isAuthenticated} = useTaskManagerContext()
    console.log(isAuthenticated)
    return isAuthenticated ? <Outlet/> : <Navigate to={'/login'}/>
}

export default ProtectedRoute;