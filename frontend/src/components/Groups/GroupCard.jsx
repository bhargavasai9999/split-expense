import React, { useState } from 'react';
import { BsPlusCircle } from 'react-icons/bs';
import { CreatePopup } from './CreatePopup';
import { EditPopup } from './EditPopup';
import { GroupItem } from './GroupItem';
import { MdGroups3 } from "react-icons/md";

export const GroupCard = () => {
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [editedGroupIndex, setEditedGroupIndex] = useState(null);
    const [tempdata,settempdata]=useState(null);
    const friendlist=["bhargav","parshuram","partheev","parshuram","partheev","parshuram","partheev","parshuram","partheev"]
    const openModal = () => {
        setShowModal(true);
        setEditedGroupIndex(null)
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

    return (
        <div>
            <h2 className='m-3 p-3 text-center'><MdGroups3 size={40} className='mb-2'/>&ensp;Groups</h2>
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
                    data.map((groupdata, index) => (
                        <div key={index} onClick={() => {openEditModal(index,groupdata)}}>
                            <GroupItem  />
                        </div>
                    ))}
            </div>
            <CreatePopup show={showModal} onClose={closeModal} list={friendlist} />
            {editedGroupIndex!=null && (
                <EditPopup show={editModal} onClose={closeEditModal} data={tempdata} list={friendlist}  />
            )}
        </div>
    );
};

const data = [{
                groupName:"bhargava sai",
                groupDescription:"goa plan",
                selectedFriend:["parshuram","bhargav"]
            },{
                groupName:"bhargava sai",
                groupDescription:"goa plan",
                selectedFriend:["parshuram","bhargav"]
            },{
                groupName:"bhargava sai",
                groupDescription:"goa plan",
                selectedFriend:["parshuram","bhargav"]
            },{
                groupName:"bhargava sai",
                groupDescription:"goa plan",
                selectedFriend:["parshuram","bhargav"]
            },{
                groupName:"bhargava sai",
                groupDescription:"goa plan",
                selectedFriend:["parshuram","bhargav"]
            }];
