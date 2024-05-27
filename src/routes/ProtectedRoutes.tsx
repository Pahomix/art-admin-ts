import {Navigate, Outlet} from "react-router-dom";


const ProtectedRoutes = () => {

  const isAuth = () => {

    const token = localStorage.getItem('token');
    return !!token;
  }

  return isAuth() ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes