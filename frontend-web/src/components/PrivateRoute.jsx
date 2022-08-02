import React from 'react';
import { Navigate } from "react-router-dom";


const PrivateRoute = ({authenticated, component: Component}) => {
    return (
      authenticated ? Component : <Navigate to='/login' />
      // authenticated ? Component : <Navigate to='/' {...alert("접근할 수 없는 페이지입니다.")} />
    )
};

export default PrivateRoute;