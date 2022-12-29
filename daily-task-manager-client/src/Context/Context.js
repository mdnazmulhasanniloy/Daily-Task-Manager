import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from './../Firebase/Firebase.config';


export const AuthContext = createContext();


const Context = ({ children }) => {
    const auth = getAuth(app);
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false)

    //register email password
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //user update profile

    const updateUserProfile = (profile) => {
        setLoading(true)
        return updateProfile(auth.currentUser, profile)

    }

    //sign in userId password               
    const signInUserPassword = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }



    //sign in width google
    const googleSignIn = () => {
        setLoading(true);
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider);

    }

    //sign Out 
    const signOutUser = () => {
        setLoading(true);
        return signOut(auth)

    }






    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false)
        });
        return () => {
            return unsubscribe();
        }
    }, [auth]);
    const AuthInfo = {
        user,
        createUser,
        updateUserProfile,
        signInUserPassword,
        googleSignIn,
        signOutUser,
        loading,
        setLoading
    }

    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default Context;