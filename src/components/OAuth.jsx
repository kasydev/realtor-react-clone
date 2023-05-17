import React from 'react';
import {FcGoogle} from 'react-icons/fc';
import { toast } from "react-toastify";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router';
import { db } from "../firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";



const OAuth = () => {

// type of a button is submit by default
      const navigate = useNavigate();

    const onGoogleClick = async  (e)=>{
        
        try{
            const auth = getAuth();
            const provider = new GoogleAuthProvider();

            const result =  await signInWithPopup(auth, provider);
            const user = result.user;
            // check for the user

            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if(!docSnap.exists()){
               await setDoc(docRef, {
                name: user.displayName,
                email: user.email,
                timestamp: serverTimestamp()
               });

            };
            navigate('/');
            toast.success("Sign up was Successful.");

        }catch(error){
         toast.error("Could not authorized with Google");
        };


    };
    return ( 

        <button type='button' onClick={onGoogleClick} className='flex items-center justify-center w-full bg-red-700 text-white px-7 py-3 uppercase text-sm font-medium rounded hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow:lg active:shadow-lg transition duration-150 ease-in-out'>
            <FcGoogle className='mr-2 text-2xl bg-white rounded-full'/>
            Continue with Google
        </button>
     );
}
 
export default OAuth;