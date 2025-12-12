import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../Components/Loading";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import {User} from "../../Contexts/UserContext";
import { useContext } from "react";
import { baseUrl } from "../Dashboard/Variables";
import "../../index.css";
export default function Register() {
  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [err,seterr]=useState("");
  const [load,setload]=useState(false);
  const cookie=new Cookies();
  const navigate=useNavigate();
  let currentUser=useContext(User);
  function handleform(e) {
    setform({ ...form, [e.target.name]: e.target.value });
  }
  async function submit(e) {
    e.preventDefault();
    setload(true);
    try {
      const res=await axios.post(`${baseUrl}/api/register`, form);
      setload(false);
      const token=res.data.data.token;
      cookie.set("Bearer",token);
      currentUser.setUser(res.data.data.user);
      navigate("/dashboard");
    } catch (err) {
      setload(false);
      if(err.status===500)
        seterr("Email is already been taken");
      else
        seterr("Internal Server Error");
    }
  }
  return (
    <div className="container">
      <div className="row" style={{margin:"auto"}}>
        <form className="reg-log" onSubmit={submit}>
          <div className="half">
          {/* <img alt="" src="0dc99038-2bb8-4f51-a2b6-802a656b89cc.png" style={{margin:"auto",width:"100%"}}></img> */}
            <h1>Sign Up</h1>
            <div>
              <input
                name="name"
                type="text"
                required
                placeholder="Name"
                onChange={handleform}
                ></input>
                <label>Name</label>
            </div>
            <div>
              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                onChange={handleform}
                ></input>
                <label>Email</label>
            </div>
            <div>
              <input
                name="password"
                type="password"
                required
                placeholder="Password"
                onChange={handleform}
                minLength="8"
                ></input>
                <label>Password</label>
            </div>
            <div>
              <input
                name="phone"
                type="text"
                required
                placeholder="Phone"
                onChange={handleform}
                minLength="8"
                ></input>
                <label>Phone</label>
            </div>
            {load?<Loading border={"6px solid #FA5A1D"}/>:<button>Create Account</button>}
            <div className="d-flex align-items-center" style={{justifyContent:"center",textAlign:"center",gap:"5px"}}>
            <p style={{margin:"0",fontWeight:"500",color:"white"}}>Already have an account?</p>
            <Link  to={"/login"} className="" style={{margin:"0",color:"#FA5A1D"}}>Log in</Link>
            </div>
            {err!==""&&<span className="error">{err}</span>}
          </div>
        </form>
      </div>
    </div>
  );
}
