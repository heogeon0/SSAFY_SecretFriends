import React from 'react';
import { Navigate } from "react-router-dom";


const PublicRoute = ({authenticated, component: Component}) => {
    console.log(authenticated)
    return (
      !authenticated ? Component : <Navigate to='/' />
    )
};

export default PublicRoute;