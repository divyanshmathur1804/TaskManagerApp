import { Loader } from "Components/Loader/Loader"
import { useTaskManagerContext } from "Context/TaskManagerContext"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = () => {
    const {isAuthenticated, loading} = useTaskManagerContext()
    if (loading) return <Loader/>;
    return isAuthenticated ? <Outlet/> : <Navigate to={'/login'}/>
}

export default ProtectedRoute;