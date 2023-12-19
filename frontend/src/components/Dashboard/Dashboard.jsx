import { React,useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { FaHandshake, FaRegHandshake } from 'react-icons/fa'; 
import './Dashboard.css';
import { CreatePopup } from './addExpense';
import Expense from '../Expenses/Expense';
import { IoMdAdd } from "react-icons/io";
import config from '../../apis/config';
import api from '../../apis/axiosConfig';

const Dashboard = () => {
    const [showModal, setShowModal] = useState(false);
    const [friendlist,setfriendlist]=useState(null);
    const [grouplist,setgrouplist]=useState(null);
    const openModal = () => {
        setShowModal(true);
        fetch_friends();
        fetch_groups();
    };
    const closeModal = () => setShowModal(false);
    const fetch_friends=async ()=>{
        //fetching friends list
     await api.get("/friends",config).then((res)=>{
        setfriendlist(res.data);
        console.log(friendlist);
    })
    .catch((err)=>{
        console.log(err);
    })
    }

    const fetch_groups=async ()=>{
        //fetching group details
        await api.get("/group",config).then((res)=>{
        setgrouplist(res.data);
        console.log(grouplist);
        }).catch((err)=>{
            console.log(err);
})
    }


    return (
        <>
        <div className="cont">
            <div className="dashboard-title">
                <h2>Dashboard</h2>
                <button className="add-expense-button shadow" onClick={openModal}><IoMdAdd size={25} className='pb-1'/>&ensp;Add Expense</button>
            </div>

            <div className="cards-container">
                <div className="card owe">
                    <FaHandshake className="owe-icon" />
                    <h3 className="card-title">You Owe</h3>
                    <p className="amount">
                        <span className="currency-symbol">₹</span>500
                    </p>
                </div>

                <div className="card owes-you">
                    <FaRegHandshake className="owes-you-icon" />
                    <h3 className="card-title">Owes You</h3>
                    <p className="amount">
                        <span className="currency-symbol">₹</span>200
                    </p>
                </div>
            </div>
        </div>
        <CreatePopup show={showModal} onClose={closeModal} friends={friendlist} groups={grouplist} />
        <Expense/>
        </>
    );
    
};

export default Dashboard;
