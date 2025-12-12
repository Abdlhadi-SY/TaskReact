import { Route, Routes } from "react-router-dom";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import Home from "./Pages/Website/Home";
import "./index.css";
import "./Pages/Css/Components/form.css"
import "./all.min.css";
import "bootstrap/dist/css/bootstrap.min.css"
import Dashboard from "./Pages/Dashboard/Dashboard";
import RequireAuth from "./Pages/Auth/RequireAuth";
import Err404 from "./Pages/Auth/Err404";
import RequireBack from "./Pages/Auth/RequireBack";
import Tasks from "./Pages/Dashboard/Tasks";
import Task from "./Pages/Dashboard/Task";
import AddTask from "./Pages/Dashboard/AddTask";
export default function App(){
  return (
      <Routes>
        <Route element={<RequireBack/>}>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
        </Route>

        <Route path="/*" element={<Err404/>}/>


        <Route path="/" element={<Home/>}></Route>
        
      <Route element={<RequireAuth allowedrole={["user"]}/>}>
          <Route path="/dashboard" element={<Dashboard/>}>
            <Route path="tasks" element={<Tasks/>}></Route>
            <Route path="tasks/add" element={<AddTask/>}></Route>
            <Route path="tasks/:id" element={<Task/>}></Route>
          </Route>
        </Route>
      </Routes>
  );
}