import React, { Fragment } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import Spinner from './Spinner';

const PrivateRoute = () => {
    const {loggedIn, checkingStatus } = useAuthStatus();

   if(checkingStatus){
         return <Spinner/>
   };

    return ( 

        <Fragment>
         {loggedIn ? <Outlet/> : <Navigate to="/sign-in"/>}
        </Fragment>
     );
}
 
export default PrivateRoute;