import FormTask from "../../Components/Dashboard/FormTask";
import FormEmployee from "../../Components/Dashboard/FormTask";
export default function AddTask(){
  const task={
    title:"",
    description:"",
  }
  return <FormTask task={task}></FormTask>
}