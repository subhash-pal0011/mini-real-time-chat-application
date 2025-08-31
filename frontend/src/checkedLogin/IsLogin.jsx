import React from 'react'
import { Outlet, Navigate } from "react-router-dom";
import { useUser } from '../contextApi/UserContext';

const IsLogin = () => {
       const { user } = useUser();
       // Agar user login hai to child routes dikhayenge (Outlet)
       // warna login page par redirect kar denge
       return user ? <Outlet /> : <Navigate to="/login" replace />;  //👉 Simple bhaasha me:
       // replace ka matlab hai "naya page add mat karo, current page ko  mtlb ab chat page pe mt jana"
}
export default IsLogin;

