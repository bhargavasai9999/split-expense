import React, { useEffect, useState } from 'react';
import { BsPlusCircle } from 'react-icons/bs';
import { CreatePopup } from './CreatePopup';
import { EditPopup } from './EditPopup';
import { GroupItem } from './GroupItem';
import { MdGroups3 } from "react-icons/md";
import api from '../../apis/axiosConfig';
import {  useToasts } from 'react-toast-notifications';
import 'bootstrap/dist/css/bootstrap.css';
import config from '../../apis/config';
export const GroupCard = () => {
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [grpdetails,setgrpdetails]=useState(null);
    const [editgroupindex,setEditedgroupindex]=useState(null)
    const { addToast } = useToasts();
    const [friendlist,setfriendlist]=useState([])
    const getfriendlist= async ()=>{
        await api.get("/friends",config).then(res=>{
            setfriendlist(res.data);
            console.log(res.data)
        })
        .catch(err=>{
                addToast("No friends found", { appearance: 'danger' });
        })
    }
    const openModal = () => {
        setShowModal(true);
        getfriendlist();
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const openEditModal = (groupdata) => {
        getfriendlist();
        get_groupdetail(groupdata.id)
        setEditModal(true);
        setEditedgroupindex(groupdata.id)
        setgrpdetails(groupdata);
    };

    const closeEditModal = () => {
        setEditModal(false);
        setEditedgroupindex(null)
    };

    const [group_data,setgroup_data]=useState([])
    const get_groupdetail = (id) => {
        api.get(`/group/${id}`, config).then((res) => {
            setgroup_data(res.data);
        }).catch((error) => {
            console.error("Error fetching group details:", error);
        });
    };

const [data,setdata]=useState([]);
const getAllgroupdetails=()=>{
    api.get("/group",config).then(res=>{
        setdata(res.data);
    })
}

const re_render=()=>{
    getAllgroupdetails();
}
useEffect(()=>{
    getAllgroupdetails();
},[])
    return (
        <div>
            <h2 className='text-start px-4'><MdGroups3 size={40} className='mb-2'/>&ensp;Groups</h2>
            <div className='container-fluid d-flex flex-row flex-wrap justify-content-space-between col-12'>
                <div
                    className='groupcard-create-div d-flex flex-column justify-content-center text-center shadow p-3'
                    onClick={openModal}
                >
                    <h4 className='d-inline'>
                        <BsPlusCircle size={30} className='pb-1' color='red' />
                        &ensp;Group
                    </h4>
                </div>
                {data.length > 0 &&
                    data.map((groupdata) => (
                        <div key={groupdata.id} onClick={() => {openEditModal(groupdata)}}>
                            <GroupItem name={groupdata.name} id={groupdata.id} />
                        </div>
                    ))}
            </div>
            <CreatePopup show={showModal} onClose={closeModal} list={friendlist} update={re_render} />
            {editgroupindex!=null && (
                <EditPopup show={editModal} onClose={closeEditModal} friends={friendlist} update={re_render} groupdetail={grpdetails} group_data={group_data} />
            )}
        </div>
    );
};

