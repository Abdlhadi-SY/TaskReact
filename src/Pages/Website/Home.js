import { useNavigate } from "react-router-dom";
import Logout from "../Auth/Logout";
import { useEffect } from "react";

export default function Home(){
    const navigate=useNavigate();
    useEffect(() => {
    navigate("/dashboard", { replace: true });
  }, []);

}