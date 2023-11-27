import React, { useEffect, useState } from 'react';
import { BsPlusCircle } from 'react-icons/bs';
import { CreatePopup } from './CreatePopup';
import { EditPopup } from './EditPopup';
import { GroupItem } from './GroupItem';
import { MdGroups3 } from "react-icons/md";
import api from '../../apis/axiosConfig';
import {  useToasts } from 'react-toast-notifications';

export const GroupCard = () => {
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [editedGroupIndex, setEditedGroupIndex] = useState(null);
    const [tempdata,settempdata]=useState(null);
    const [friendlist,setfriendlist]=useState([])
    const { addToast } = useToasts();

    const openModal = () => {
        setShowModal(true);
        setEditedGroupIndex(null);
        getfriendlist();
    };

    const closeModal = () => {
        setShowModal(false);
        setEditedGroupIndex(null);
    };

    const openEditModal = (index,groupdata) => {
        setEditModal(true);
        setEditedGroupIndex(index);
        settempdata(groupdata);
    };

    const closeEditModal = () => {
        setEditModal(false);
        setEditedGroupIndex(null);
    };
    const token=localStorage.getItem('jwtToken');
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
const getfriendlist=()=>{
    api.get("/friends",config).then(res=>{
        addToast("friends fetched successfully", { appearance: 'success' });
        setfriendlist(res.data)
        console.log(friendlist);

        
    })
    .catch(err=>{
            addToast("No friends found", { appearance: 'danger' });
        addToast("something went wrong", { appearance: 'danger' });


    })
}
const [data,setdata]=useState([]);
const getAllgroupdetails=()=>{
    api.get("/group",config).then(res=>{
        setdata(res.data);
        console.log(data)
    })
}

useEffect(()=>{
    getAllgroupdetails();
},[]
)
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
                        <div key={groupdata.id} onClick={() => {openEditModal(index,groupdata)}}>
                            <GroupItem name={groupdata.name} />
                        </div>
                    ))}
            </div>
            <CreatePopup show={showModal} onClose={closeModal} list={friendlist} />
            {editedGroupIndex!=null && (
                <EditPopup show={editModal} onClose={closeEditModal} data={tempdata} list={[friendlist]}  />
            )}
        </div>
    );
};

