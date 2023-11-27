import 'bootstrap/dist/css/bootstrap.css';
import './module.ActivityHistory.css'

export const ActivityItem = ({ time, sender, amount,type}) => {
  return (
    <div className=' d-flex flex-row justify-content-evenly friend-item-main-div shadow col-12' >
    <div className='container-fluid d-flex flex-column'>
      <div className='d-flex flex-row justify-content-start'> 
      <div className='d-flex'>
        {type=="paid" ?  <img src="/src/static/outflow.png" className="outflow-image text-start"/>
         :  <img src="/src/static/cash_incoming.png" className="outflow-image text-start"/>}
       
      </div>
      <div className='' style={{marginLeft:"20px"}}>
        {type=== "Paid to" ? <h4 className='m-0 item-paidtype'>Paid to </h4> :<h5 className='m-0 item-paidtype'>Received</h5> }
        <h6 className='m-0 item-name'>{sender}</h6>
        {/* <p className='m-0 item-comment'>{comment}</p> */}
      </div>

      </div>
      <h6 className='pt-2'>{time}</h6>
      </div>
      <div className='d-flex flex-column justify-content-start pt-2 ' style={{marginLeft:"20px",marginTop:'5px'}}>
        <h5 className='amount-style'>&#x20B9; {amount}</h5>
         <h6 className='text-success  fw-bold'>successful</h6>
      </div>
    </div>
  );
};



