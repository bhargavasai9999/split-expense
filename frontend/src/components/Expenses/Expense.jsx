import React, { useEffect, useState } from 'react';
import './Expense.css';
import api from '../../apis/axiosConfig';
import { FaArrowAltCircleDown, FaCheck, FaTimes } from 'react-icons/fa';
import config from '../../apis/config';
import {  useToasts } from 'react-toast-notifications';

const Expense = ({owe_details,update}) => {
    const {addToast}=useToasts();

    const handleSettle = (oweid) => {
        api.post("/settle",{oweId:oweid},config).then((res)=>{
            update();
            addToast(res.data.message,{appearance:"success"});

        }).catch((err)=>{
            addToast("Something went Wrong",{appearance:'error'})
        })
        
    };
    function parse_time(time) {
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
          date: `${year}/${month < 10 ? '0' : ''}${month}/${day < 10 ? '0' : ''}${day}`,
          time: `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`
        };
      
        return istDateTime;
      }
    
      const toggleDetails = (index) => {
        const detailsElement = document.getElementById(`details-${index}`);
        const currentDisplay = window.getComputedStyle(detailsElement).getPropertyValue('display');
      
        if (currentDisplay === 'none') {
          detailsElement.style.display = 'block';
        } else {
          detailsElement.style.display = 'none';
        }
      };
      
    return (
        <div className="expense-page">
        <div className="right-section">
                <center>
                    <h3>You Owe</h3>
                    <p className='fw-bold mt-0'>( settle payments here* )</p>
                </center>
                <div className='overflow-auto' style={{maxHeight:"300px"}}>
                {owe_details?.owe.length >0 ? owe_details?.owe.map((expense) => (
                    !expense?.settle && (<div className="expense-card" key={expense.id}>
                    <div className="expense-header">
                        <div className='fw-bold'>Settle </div>
                        <div className='fw-bold text-success'>₹{expense.amount}</div>
                        <div>{expense.lendedUser.name}</div>
                        <button title='click to settle' className="settle-button" onClick={() => handleSettle(expense.id)}>
                            <FaCheck /> 
                        </button>
                    </div>
                </div>)

                )):<h5 className='fw-bold text-center m-0'>No pending settlements</h5>}
            </div>
            </div>
            <div className="left-section">
                <center>
                    <h3>Owes You</h3>
                    <p className='fw-bold mt-0'>( Pending Expenses* )</p>
                </center>
                <div className='overflow-auto' style={{maxHeight:"300px"}}>
                {owe_details?.owed.length >0 ? owe_details?.owed.map((expense,index) => (
                    <div className="expense-card" key={expense?.id}>
                        <div className="expense-header">
                            {/* <div>{expense.id}</div> */}
                            <div>{expense.user.name}</div>
                            <div>${expense.amount}</div>
                            <button title="know more" className="summary-button" onClick={() => toggleDetails(index)}>
                                <FaArrowAltCircleDown /> 
                            </button>
                        </div>
                        { (
                            <div className={`details-list mt-2 text-center`} id={`details-${index}`} style={{display:'none'}}>
                                {/* {
                                    <div key={expense.id} className="details-item">
                                        <div>{expense.user.name}</div>
                                        <div>${expense.amount}</div>
                                        <h4>Status</h4>
                                        <div>{expense.settle === true ? <FaCheck style={{color :"green"}} /> : <FaTimes style={{color :"red"}}/>}</div>
                                    </div>
                                } */}
                                <p className='text-center d-flex justify-content-evenly '><span className='fw-bold '>{expense.settle===true ? "Received.. ": "Pending.. " }</span> amount of 
                                <span className='text-danger fw-bold'>₹ {expense.amount}</span>at <span>{expense.user.name}</span></p>
                                <span className='fw-bold '>Status: </span><span className='text-center'>&nbsp;{expense.settle === false && <FaTimes style={{color :"red"}}/>} Not Received</span>
                                <span></span>
                            </div>
                        )}
                    </div>
                )):<h5 className='mt-4 text-center '>No Activity</h5>}
            </div>
            </div>
        </div>
    );
};

export default Expense;
