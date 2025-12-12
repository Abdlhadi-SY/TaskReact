import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./bars.css";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Menu } from "../../Contexts/MenuContext";
import { useContext,useState } from "react";
import { DropdownButton, DropdownItem } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import {User} from "../../Contexts/UserContext";
import { baseUrl } from "../../Pages/Dashboard/Variables";
export default function Topbar(){
    let currentUser=useContext(User);
    const menu=useContext(Menu);
    const nav=new useNavigate();
    const cookie=new Cookies();
    const token=cookie.get("Bearer");
    
        async function handlelog(){
                try{
                    await axios.post(`${baseUrl}/api/logout`,null,{
                        headers:{
                            Authorization:"Bearer " + token
                        },
                        
                    })
                    .then(()=> cookie.remove("Bearer", { path: '/' }))
                    .then(()=>currentUser.setUser(null))
                    nav("/login");
                }catch(err){
                    console.log(err);
                }
            }
    return (
    <div className="top-bar">
        <div className="top-l">
        <p style={{color:"#FA5A1D" ,fontWeight:"bold",fontSize:"20px",margin:"0"}}>Restaurant</p>
        <FontAwesomeIcon onClick={()=>menu.setopen((prev)=>!prev)} cursor={"pointer"} icon={faBars} style={{color:"white"}} ></FontAwesomeIcon>
        </div>
        <div>
        <DropdownButton  className="my-dropdown" tag="button" title={currentUser.user?.name}>
            <DropdownItem onClick={handlelog}>Logout</DropdownItem>
        </DropdownButton>
        </div>
    </div>
)
}