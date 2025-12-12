import { createContext, useState } from "react";
export const Menu=createContext();
export default function MenuContext({children}){
    const[isopen,setopen]=useState(true);
    return <Menu.Provider value={{isopen,setopen}}>{children}</Menu.Provider>
}