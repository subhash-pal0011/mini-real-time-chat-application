import React from 'react'
import { Outlet, Navigate } from "react-router-dom";
import { useUser } from '../contextApi/UserContext';

const IsLogin = () => {
       const { user } = useUser();
       // If the user is logged in, show the child routes (Outlet).
       // otherwise, redirect to the login page.
       return user ? <Outlet /> : <Navigate to="/login" replace />;  //👉 // 👉 In simple words: 
       // replace means "don’t add a new page, just replace the current one" i.e. don’t go back to the chat page
}
export default IsLogin;