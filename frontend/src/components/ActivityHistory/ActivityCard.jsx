import { ActivityItem } from "./ActivityItem"
import { TbMoodEmptyFilled } from "react-icons/tb";
import { FaHistory } from "react-icons/fa";
import { useEffect, useState } from "react";
import api from '../../apis/axiosConfig';
import config from '../../apis/config'
export const ActivityCard = () => {
const [data,setdata]=useState([]);

const get_activity=async ()=>{
  await api.get("/activity",config).then(res=>{
    setdata(res.data);
    console.log(res.data.message);
    console.log(data)
  })
  .catch(err=>{
    console.log(err);
  })

}
useEffect(()=>{
  get_activity();
})
  
  return (
    <div className="container-fluid col-12 d-flex flex-column flex-wrap justify-content-between activitycard-body-div">
      <div className="container"> 
          <h2 className="text-start mt-3 p-2 fw-bold"><FaHistory className="pb-1" />&ensp;Your Activity </h2>
      </div>
      <div className="d-flex flex flex-wrap col-12 ">     { 
        data.length>0 ? data.map((transaction)=>(
          <ActivityItem amount={transaction.amount} time={transaction.amount} sender={transaction.friendName}  type={transaction.description} />
        )
          
        )
        :<h2 className="d-inline mt-3 p-2 fw-bold"><TbMoodEmptyFilled  size={40} color="red" />&ensp;
        no transactions found </h2>
      }
        </div>
 
    </div>
  )
}

// const data=[{
//   type:"paid",
//   sender:"parshuram",
//   comment:"biriyani",
//   amount:100,
//   time:"20 August",
//   status:'successful'
// },{
//   type:"received",
//   sender:"parshuram",
//   comment:"biriyani",
//   amount:100,
//   time:"21 August",
//   status:"successful"
// },{
//   type:"received",
//   sender:"parshuram",
//   comment:"biriyani",
//   amount:300,
//   time:"21 August",
//   status:"successful"
// }
// ,{
//   type:"paid",
//   sender:"parshuram",
//   comment:"waiter",
//   amount:500,
//   time:"21 August",
//   status:"successful"
// }

// ,{
//   type:"paid",
//   sender:"parshuram",
//   comment:"grocery",
//   amount:400,
//   time:"21 August",
//   status:"successful"
// }

//]