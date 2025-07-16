import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";

const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [token,setToken]=useState(localStorage.getItem('token'));

    useEffect(()=>{
        if(token){
            localStorage.setItem('token',token);
        }else{
            localStorage.removeItem('token');
        }
    },[token]);

    const login=(newToken)=>{
        localStorage.setItem('token',newToken);
        setToken(newToken);
    }

    const logout=()=>{
        localStorage.removeItem('token');
        setToken(null);
    }
    return (
        <AuthContext.Provider value={{token,login,logout,setToken}}>
        {children}
        </AuthContext.Provider>
    );
}

export const useAuth=()=>useContext(AuthContext);
