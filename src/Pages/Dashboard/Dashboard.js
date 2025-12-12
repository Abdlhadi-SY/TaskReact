import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Dashboard/Sidebar";
import Topbar from "../../Components/Dashboard/Topbar";
import "./dashboard.css";
export default function Dashboard(){
    return(
    <div className="dashboard">
        <Topbar></Topbar>
        <div className="d-flex w-100 parent" style={{top:"101px", gap:"20px",overflowX:"auto"}}>
        <Sidebar></Sidebar>
        <Outlet></Outlet>
        </div>
    </div>
    );
}