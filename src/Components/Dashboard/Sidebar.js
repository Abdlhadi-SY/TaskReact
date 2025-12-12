import "./bars.css";
import {NavLink} from"react-router-dom";
import {FontAwesomeIcon} from"@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { Menu } from "../../Contexts/MenuContext";
import { Nav } from "./Navlink";
import {User} from "../../Contexts/UserContext";
export default function Sidebar(){
    const [winres,setwinres]=useState(window.innerWidth);
    const currentUser=useContext(User);
    window.addEventListener("resize",()=>{
        setwinres(window.innerWidth);
    });
    const menu=useContext(Menu);
    const Navs=Nav.filter((n)=>(currentUser.user?.role)===n.role)
    .map((n,index)=>
        <NavLink key={index} to={n.to} className="nav">
        <FontAwesomeIcon icon={n.icon}></FontAwesomeIcon>
        <p className="m-0-10" style={{opacity:menu.isopen?"1":"0"}}>{n.title}</p>
        </NavLink>
    )
    return (
        <>
        <div className="side-bar" style={{
        width:menu.isopen?"270px":"60px",
        left:winres<"768"?(!menu.isopen?"-100%":"0"):"0",
        display:winres<"768"?(!menu.isopen?"none":"block"):"block",
        top:"0",
        }}>
        {Navs}
    </div>
    </>
    )
}