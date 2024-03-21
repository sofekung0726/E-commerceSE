import { Navigate, useLocation  } from "react-router-dom";
import { AuthContext } from '../../context/AuthProvider'
import { useContext, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";



const adminRoute = () => {
    const {user} = useAuth();
    const location = useLocation();
    if (user && isAdmin) {
        return children
    }
  return (
    <Navigate  to="/signin" state={{from:location}} replace/>
  )
}

export default adminRoute