import { createContext, useEffect, useState } from "react";
export const User=createContext({});
export default function UserContext({children}){
    const[user,setUser]=useState({});
    const[loaded,setload]=useState(false);
    useEffect(()=>{
        const currentUser=JSON.parse(localStorage.getItem("user"));
        if(currentUser)
            setUser(currentUser);
        setload(true);
    },[])
    useEffect(()=>{
        if(loaded)
            if(user)
                localStorage.setItem("user",JSON.stringify(user));
            else
                localStorage.removeItem("user");
    },[user])
    
    return <User.Provider value={{user,setUser}}>{children}</User.Provider>
}