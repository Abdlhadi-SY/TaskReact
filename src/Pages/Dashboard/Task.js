import axios from "axios";
import { useEffect, useState } from "react";
import { data, Navigate, useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import { baseUrl } from "./Variables";
import FormTask from "../../Components/Dashboard/FormTask";
export default function Task(){
    const {id}=useParams();
    const cookie=new Cookies();
    const[task,settask]=useState({
        id:"",
        title:"",
        description:"",
    });
    const[flag,setflag]=useState(false);
    const token=cookie.get("Bearer");
    const nav=useNavigate();
    useEffect(()=>{
        axios.get(`${baseUrl}/api/showTask`,{
            headers:{
                Authorization:"Bearer "+  token
            },
            params:{
                id:id
            }
        })
        .then((data)=>settask(data.data.data))
        .then(()=>setflag(true))
        .catch(()=>nav("/404"))
    },[])
    return flag&&<FormTask header="Edit" end={`updateTaskDetails/${id}`} task={task}></FormTask>
}