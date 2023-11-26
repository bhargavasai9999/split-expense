import { ActivityItem } from "./ActivityItem"
import { TbMoodEmptyFilled } from "react-icons/tb";

import { FaHistory } from "react-icons/fa";

export const ActivityCard = () => {

  
  return (
    <div className="container-fluid col-12 d-flex flex-column flex-wrap justify-content-between activitycard-body-div">
      <div className="container d-flex justify-content-evenly"> 
          <h2 className="d-inline mt-3 p-2 fw-bold"><FaHistory className="pb-1" />&ensp;Your Activity </h2>
      </div>
      <div className="d-flex flex flex-wrap col-12 ">     { 
        data.length>0 ? data.map((transaction)=>(
          <ActivityItem comment={transaction.comment} amount={transaction.amount} time={transaction.time} sender={transaction.sender} status={transaction.status} type={transaction.type} />
        )
          
        )
        :<h2 className="d-inline mt-3 p-2 fw-bold"><TbMoodEmptyFilled  size={40} color="red" />&ensp;
        no transactions found </h2>
      }
        </div>
 
    </div>
  )
}

const data=[{
  type:"paid",
  sender:"parshuram",
  comment:"biriyani",
  amount:5000,
  time:"20 August",
  status:'pending'
},{
  type:"received",
  sender:"parshuram",
  comment:"biriyani",
  amount:500,
  time:"21 August",
  status:"successful"
},{
  type:"received",
  sender:"parshuram",
  comment:"biriyani",
  amount:500,
  time:"21 August",
  status:"successful"
}
,{
  type:"received",
  sender:"parshuram",
  comment:"biriyani",
  amount:500,
  time:"21 August",
  status:"successful"
}

,{
  type:"received",
  sender:"parshuram",
  comment:"biriyani",
  amount:500,
  time:"21 August",
  status:"successful"
}

]