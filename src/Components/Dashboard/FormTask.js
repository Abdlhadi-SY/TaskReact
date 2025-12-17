import { useState } from "react";
import axios from "axios";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { baseUrl } from "../../Pages/Dashboard/Variables";

export default function FormTask({header="AddTask",end="addTask",task}){
  const cookie=new Cookies();
  const [form, setform] = useState({
    id:task.id,
    title: task.title,
    description: task.description,
  });
  const [err,seterr]=useState("");
  const [load,setload]=useState(false);
  const navigate=useNavigate();
  function handleform(e) {
    setform({ ...form, [e.target.name]: e.target.value });
  }
  async function submit(e) {
    e.preventDefault();
    setload(true);
    try {
      await axios.post(`${baseUrl}/api/${end}`, form,{
          headers:{
                    Authorization:"Bearer " + cookie.get("Bearer")
                },
      });
      setload(false);
      navigate("/dashboard/tasks");
    } catch (err) {
      console.log(err)
      setload(false);
      seterr(err.response.data.message);
    }
  }
  return (
    
    <div className="container">
        <form className="addItem" onSubmit={submit}>
          <div className="half">
            <h1 style={{color:"#FA5A1D"}}>{header}</h1>
            <div>
              <input
                name="title"
                value={form.title}
                type="text"
                required
                placeholder="Title"
                onChange={handleform}
                ></input>
                <label>Title</label>
            </div>
            <div>
              <input
                value={form.description}
                name="description"
                type="text"
                required
                placeholder="Description"
                onChange={handleform}
                ></input>
                <label>Description</label>
            </div>
            {load?<Loading border={"6px solid #FA5A1D"}/>:<button>Save</button>}
            {err!==""&&<span className="error">{err}</span>}
          </div>
        </form>
      </div>
  );
}