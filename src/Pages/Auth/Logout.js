import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { baseUrl } from "../Dashboard/Variables";

export default function Logout(){
    const cookie=new Cookies();
    const nav=useNavigate();
    const token=cookie.get("Bearer");
    async function handlelog(){
        try{
            await axios.post(`${baseUrl}/api/logout`,null,{
                headers:{
                    Authorization:"Bearer " + cookie.get("Bearer")
                },
                
            });
            cookie.remove("Bearer");
            nav("/login");
            // window.location.pathname="/login"
        }catch(err){
            console.log(err);
        }
    }
    return(
        <button onClick={handlelog}>Logout</button>
    );
}