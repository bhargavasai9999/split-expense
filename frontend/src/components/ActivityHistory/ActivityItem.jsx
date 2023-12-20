import 'bootstrap/dist/css/bootstrap.css';
import './module.ActivityHistory.css'

export const ActivityItem = ({ time, sender, amount,type}) => {
  function convertUTCtoISTAndGetSeparateDateTime(time) {
    const utcDate = new Date(time);
    const offsetIST = 330; // UTC+5:30 for Indian Standard Time
    const istTimestamp = utcDate.getTime() + offsetIST * 60000;
    
    const istDate = new Date(istTimestamp);

    const year = istDate.getFullYear();
    const month = istDate.getMonth() + 1; 
    const day = istDate.getDate();
    const hours = istDate.getHours();
    const minutes = istDate.getMinutes();
    const seconds = istDate.getSeconds();
    
    const istDateTime = {
      date: `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`,
      time: `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`
    };
  
    return istDateTime;
  }
  const timestamp=convertUTCtoISTAndGetSeparateDateTime(time);
  return (
    <div className=' d-flex flex-row justify-content-evenly friend-item-main-div shadow-sm col-12' >
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
      <h6 className='pt-2'>&#8986;{timestamp.time}&nbsp;- {timestamp.date}  </h6>
      </div>
      <div className='d-flex flex-column justify-content-start pt-2 ' style={{marginLeft:"20px",marginTop:'5px'}}>
        <h5 className='amount-style'>&#x20B9; {amount}</h5>
         <h6 className='text-success  fw-bold'>successful</h6>
      </div>
    </div>
  );
};



