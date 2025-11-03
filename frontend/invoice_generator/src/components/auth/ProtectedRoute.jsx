import { Navigate,Outlet } from 'react-router-dom'
import DashboardLayout from '../layout/DashboardLayout';
import {useAuth} from "../../context/AuthContex"

const ProtectedRoute = ({children}) => {
    //integrate later !!
    const { isAuthenticated, loading } = useAuth();

    if(loading){
        return <div>Loading...</div>;
    }

    if(!isAuthenticated){
        return <Navigate to="/login" replace />;
    }

  return (
    <DashboardLayout>{children ? children : <Outlet />}</DashboardLayout>
  )
}

export default ProtectedRoute