import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Pagination, Table } from "react-bootstrap";
import Cookies from "universal-cookie";
import { baseUrl } from "./Variables";
import { data, Link } from "react-router-dom";

export default function Tasks(){
  const[status,setstatus]=useState("all");
  const[tasks,setTasks]=useState([]);
  const[totalTasks,settotalTasks]=useState({
    allTask:0,
    pending:0,
    in_progress:0,
    done:0
  });
  const[notasks,setnoTasks]=useState(false);
  const[page,setpage]=useState(1);
  const[flag,setflag]=useState(false);
  const[item,setItem]=useState(false);
  const[show,setshow]=useState(false);
  const[completeId,setcompleteId]=useState(false);
    const cookie=new Cookies();
    const token=cookie.get("Bearer");
    const [currentPageForAll, setCurrentPageForAll] = useState(1);
    const [currentPagePending, setCurrentPagePending] = useState(1);
    const [currentPageInProgress, setCurrentPageInProgress] = useState(1);
    const [currentPagedone, setCurrentPagedone] = useState(1);
    useEffect(()=>{
        axios.get(`${baseUrl}/api/showAllTasks`,{
            headers:{
                Authorization:"Bearer "+  token
            },
            params:{
                page:page,
                status:status
            }
        })
        .then((res)=>{
          setTasks(res.data.tasks.data)
          settotalTasks(res.data.totalTasks)
          setflag(true)
        })
        .catch((err)=>console.log(err))
    },[item,page,status])    
    const statiscs={
      border:"3px solid #FA5A1D",
      padding:"10px",
      borderRadius:"6px",
      width:"150px",
      textAlign:"center"
    }
    const handleClick = (number,status) => {
        status==="all"?setCurrentPageForAll(number):
        status==="pending"?setCurrentPagePending(number):
        status==="in_progress"?setCurrentPageInProgress(number):
        setCurrentPagedone(number)
        setpage(number);
    };
    function changeStatus(name,e){
      let elements=document.querySelectorAll(".col");
      elements.forEach((element)=>{
        element.style.background="#2C2629";
        element.style.color="white";
      })
      e.style.background="#FA5A1D";
      e.style.color="white";
      setstatus(name);
      setpage(1);
    }
    function updateStatus(status,id){
      try{
      axios.post(`${baseUrl}/api/updateTaskStatus/${id}`,{status:status},{
        headers:{
          Authorization:"Bearer "+  token
        },
      })
      .then(()=>setItem((pre)=>!pre))
    }catch(e){
      console.log(e.message);
    }
    };
    function deleteTask(id){
      try{
        axios.delete(`${baseUrl}/api/deleteTask/${id}`,{
          headers:{
            Authorization:"Bearer "+  token
          },
        })
        .then(()=>setItem((pre)=>!pre))
    }catch(e){
      console.log(e.message);
    }
  }
    
    const totalPagesforall = Math.ceil(totalTasks.allTask / 10);
    const totalPagesforpending = Math.ceil(totalTasks.pending / 10);
    const totalPagesforin_progress = Math.ceil(totalTasks.in_progress/ 10);
    const totalPagesfordone = Math.ceil(totalTasks.done/ 10);
    if(status==="all"){
      if(tasks.length===0&&flag&&currentPageForAll>1){
        setCurrentPageForAll((prev)=>prev-1);
        setpage((prev)=>prev-1);
    }
    }
    else if(status==="pending"){
      if(tasks.length===0&&flag&&currentPagePending>1){
        setCurrentPagePending((prev)=>prev-1);
        setpage((prev)=>prev-1);

      }
    }
    else if(status==="in_progress"){
      if(tasks.length===0&&flag&&currentPageInProgress>1){
          setCurrentPageInProgress((prev)=>prev-1);
          setpage((prev)=>prev-1);
      }
    }
    else{
      if(tasks.length===0&&flag&&currentPagedone>1){
        setCurrentPagedone((prev)=>prev-1);
        setpage((prev)=>prev-1);

    }
  }
  function ShowMessage({id}){
    return(
      <div className="sure" id="message">
        <div style={{width:"fit-content", background:"#FA5A1D",borderRadius:"6px",padding:"20px"}}>
          <p style={{width:"fit-content",margin:" 0 auto 10px"}}>Are you sure you want to Complete this action</p>
          <div className="d-flex justify-content-evenly">
            <button className="butt-item" style={{background:"#35C3BC"}} onClick={()=>{updateStatus("done",id);setshow(false)}} >Yes</button>
            <button className="butt-item" style={{background:"#35C3BC"}} onClick={()=>{setshow(false)}} >NO</button>
          </div>  
      </div>
  </div>
  );
  }
  let paginationItemsforall= [];
  let paginationItemsforpending = [];
  let paginationItemsforin_progress = [];
  let paginationItemsfordone = [];
  for (let number = 1; number <= totalPagesforall; number++) {
    paginationItemsforall.push(
      <Pagination.Item   key={number} active={number === currentPageForAll} onClick={() => handleClick(number,"all")}>
        {number}
      </Pagination.Item>
    );
    if(number<=totalPagesforpending){
        paginationItemsforpending.push(
          <Pagination.Item  key={number} active={number === currentPagePending} onClick={() => handleClick(number,"pending")}>
            {number}
          </Pagination.Item>
      );
    }
    if(number<=totalPagesforin_progress){
        paginationItemsforin_progress.push(
          <Pagination.Item style={{color:"#FA5A1D"}}  key={number} active={number === currentPageInProgress} onClick={() => handleClick(number,"in_progress")}>
            {number}
          </Pagination.Item>
      );
    }
    if(number<=totalPagesfordone){
        paginationItemsfordone.push(
          <Pagination.Item style={{color:"#FA5A1D"}}  key={number} active={number === currentPagedone} onClick={() => handleClick(number,"done")}>
            {number}
          </Pagination.Item>
      );
    }
  }
  const showTasks=tasks.map((task,index) => (
                <tr key={index}>
                    <td>{task.title}</td>                    
                    <td>{task.description}</td>                    
                    <td style={{fontWeight:"bold","#3FF57D":task.status==="done"?"green":task.status==="in_progress"?"#35C3BC":"#FA5A1D"}}>
                      {
                        task.status==="done"?
                        <span className="status" style={{backgroundColor: "rgb(63, 245, 125,0.2)",color:"rgb(63, 245, 125)",margin:"auto"}}>{task.status}</span>:
                        task.status==="pending"?
                        <span className="status" style={{backgroundColor: "rgb(242, 140, 40, 30%)",color:"#F28C28",margin:"auto"}}>{task.status}</span>:
                        <span className="status" style={{backgroundColor: "rgb(255 92 92 / 30%)",color:"rgb(255 92 92 )",margin:"auto"}}>{task.status}</span>
                        
                      } 
                    </td>
                    {
                status!=="all"&&status!=="done"?
                    <td>
                      <div className="d-flex justify-content-evenly">
                        {
                          status==="pending"?
                          <>
                          <button onClick={()=>{setcompleteId(task.id);setshow(true)}} className="butt-item" style={{background:"green"}}>Done</button>
                          <button onClick={()=>updateStatus("in_progress",task.id)} className="butt-item" style={{background:"#35C3BC"}}>InProgress</button>
                          <Link to={`${task.id}`}><button onClick={()=>updateStatus("in_progress",task.id)} className="butt-item" style={{background:"#693649ff"}}>Update</button></Link>
                          <button onClick={()=>deleteTask(task.id)} className="butt-item" style={{background:"red"}}>Delete</button>
                          </>:
                          status==="in_progress"?
                          <> 
                          <button onClick={()=>updateStatus("pending",task.id)} className="butt-item" style={{background:"#FA5A1D"}}>Pending</button>
                          <button onClick={()=>{setcompleteId(task.id);setshow(true)}} className="butt-item" style={{background:"green"}}>Done</button>
                          <Link to={`${task.id}`}><button onClick={()=>updateStatus("in_progress",task.id)} className="butt-item" style={{background:"#693649ff"}}>Update</button></Link>
                          <button onClick={()=>deleteTask(task.id)} className="butt-item" style={{background:"red"}}>Delete</button>
                          </>:
                          ""
                        }
                      </div>
                    </td>:""
                  } 
                </tr>
  ))

  return (
    <>
    <Container style={{marginTop:"40px",position:"relative"}}>
      <div className="d-flex justify-content-between align-items-center">
        <h1 style={{color:"#FA5A1D"}}>Tasks</h1>
        <Link to={`add`}><button className="butt-item" style={{background:"#FA5A1D"}}>Add Task</button></Link>
      </div>
      <div className="d-flex align-items-center" style={{gap:"30px",marginBlock:"20px"}}>
        <div style={statiscs}>
          <p style={{color:"#FA5A1D"}}>Total Tasks</p>
          <p style={{color:"white"}}>{totalTasks.allTask}</p>
        </div>
        <div style={statiscs}>
          <p style={{color:"#FA5A1D"}}>Pending</p>
          <p style={{color:"white"}}>{totalTasks.pending}</p>
        </div>
        <div style={statiscs}>
          <p style={{color:"#FA5A1D"}}>InProgress</p>
          <p style={{color:"white"}}>{totalTasks.in_progress}</p>
        </div>
        <div style={statiscs}>
          <p style={{color:"#FA5A1D"}}>Done</p>
          <p style={{color:"white"}}>{totalTasks.done}</p>
        </div>
      </div>
      <div style={{marginBottom:"30px"}}>
        <button onClick={(e)=>changeStatus("all",e.target)} className="butt-item col" style={{color:"white",background:"#FA5A1D",borderTopLeftRadius: "6px",borderBottomLeftRadius: "6px",borderTopRightRadius: "0px",borderBottomRightRadius: "0px"}}>All</button>
        <button onClick={(e)=>changeStatus("pending",e.target)} className="butt-item col"   style={{color:"white",background:"#2C2629",borderRadius:"0" }}>Pending</button>
        <button onClick={(e)=>changeStatus("done",e.target)} className="butt-item col" style={{color:"white",background:"#2C2629",borderRadius:"0"}}>Done</button>
        <button onClick={(e)=>changeStatus("in_progress",e.target)}  className="butt-item col"style={{color:"white",background:"#2C2629",borderTopRightRadius: "6px",borderBottomRightRadius: "6px",borderTopLeftRadius: "0px",borderBottomLeftRadius: "0px"}}>InProgress</button>
      </div>
      <div className="card-table">
        <p>Tasks</p>
      <Table  style={{textAlign:"center"}}  hover responsive variant="dark" >
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            {
              status!=="all"&&status!=="done"?
            <th>Actions</th>
            :""
          }
          </tr>
        </thead>
        <tbody >
            {
              showTasks.length===0&&flag?
              <tr><td style={{textAlign:"center"}} colSpan={12}>There are no Tasks</td></tr>:
              showTasks.length===0?
              <tr><td style={{textAlign:"center"}} colSpan={12}>Loading</td></tr>:
              showTasks
            }
        </tbody>
    </Table>
    </div>
    {showTasks.length>0?<Pagination className="justify-content-center">{
      status==="all"?paginationItemsforall:
      status==="pending"?paginationItemsforpending:
      status==="in_progress"?paginationItemsforin_progress:
      paginationItemsfordone
      }</Pagination>:""}
    </Container>
    {show?<ShowMessage id={completeId}/>:""}
    </>
  );
}