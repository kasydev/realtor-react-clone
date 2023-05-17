import React, { Fragment, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";



export function useAuthStatus ()  {

    const [loggedIn, setLoggedIn] = useState(false);
    const [checkingStatus, setSetCheckingStatus] = useState(true);


    useEffect(()=>{

        const auth = getAuth();
        onAuthStateChanged(auth, (user)=>{
            if(user){
                setLoggedIn(true);
            };
            setSetCheckingStatus(false);
        });
    },[]);
    return {loggedIn, checkingStatus}
}
