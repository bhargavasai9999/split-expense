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
    const [friendlist,setfriendlist]=useState([]);
    const [grouplist,setgrouplist]=useState([]);
    const [owe_details,setowe_details]=useState(null);
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
    })
    .catch((err)=>{
        console.log(err);
    })
    }

    const fetch_groups=async ()=>{
        //fetching group details
        await api.get("/group",config).then((res)=>{
        setgrouplist(res.data);
        }).catch((err)=>{
            console.log(err);
})
    }
    const fetch_owe_details=async ()=>{
        await api.get("/oweAndOwed",config).then((res)=>{
            setowe_details(res.data);
        }).catch((err)=>{
            console.log("Something went wrong")
        })
    }


useEffect(()=>{
    fetch_owe_details();
},[])
    return (
        <>
        <div className="cont">
            <div className="dashboard-title">
                <h2>Dashboard</h2>
                <button className="add-expense-button shadow" onClick={openModal}><IoMdAdd size={25} className='pb-1 fw-bold'/>&ensp;Add Expense</button>
            </div>

            <div className="cards-container">
                <div className="card owe">
                    <FaHandshake className="owe-icon" />
                    <h3 className="card-title ">You Owe</h3>
                    <p className="amount text-success fw-bold">
                        <span className="currency-symbol">₹</span>{owe_details?.totalOwe}
                    </p>
                </div>

                <div className="card owes-you">
                    <FaRegHandshake className="owes-you-icon" />
                    <h3 className="card-title">Owes You</h3>
                    <p className="amount text-danger fw-bold">
                        <span className="currency-symbol">₹</span>{owe_details?.totalOwed}
                    </p>
                </div>
            </div>
        </div>
        <CreatePopup show={showModal} onClose={closeModal} friends={friendlist} groups={grouplist} />
        <Expense owe_details={owe_details} update={fetch_owe_details}/>
        </>
    );
    
};

export default Dashboard;
