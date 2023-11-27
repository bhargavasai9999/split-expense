import 'bootstrap/dist/css/bootstrap.css';
import './module.groups.css';
import { GrUpdate, GrTrash } from "react-icons/gr"; // Assuming you have a delete icon
import config from '../../apis/config';
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import {  useToasts } from 'react-toast-notifications';
import api from '../../apis/axiosConfig';

export const EditPopup = ({ show, onClose, data, friends, onDelete,update }) => {
    console.log(data);
    const { addToast } = useToasts();
    const [formData, setFormData] = useState({
        groupName: data.name,
        groupDescription: data.groupDescription,
        selectedFriends: friends.map(friend => friend.friendId),
        groupid:data.id
    });

    const handleCheckboxChange = (friendId) => {
        setFormData((prevData) => ({
            ...prevData,
            selectedFriends: prevData.selectedFriends.includes(friendId)
                ? prevData.selectedFriends.filter((selectedFriend) => selectedFriend !== friendId)
                : [...prevData.selectedFriends, friendId],
        }));
    };

    const handleFormSubmit =  () => {
        console.log('Form submitted with edited data:', formData);
        api.put("/group",{name:formData.groupName,userIds:formData.selectedFriends,groupId:formData.groupid},config)
        .then(res=>{
             addToast("group deleted successfully", { appearance: 'success' });
        })
        .catch(err=>{
            // addToast("No friends found", { appearance: 'danger' });
        })
        setFormData({
            groupName: '',
            groupDescription: '',
            selectedFriends: [],
            groupid:null
        });
        onClose();
    };

    const handleDelete = () => {
        // Perform the delete action here
        onDelete(data.id); // Assuming you pass the group ID to onDelete
        onClose();
    };

   

    return (
        <Modal show={show} onHide={onClose} onClick={()=>update()}>
            <Modal.Header closeButton>
                <Modal.Title><GrUpdate size={20} className='pb-1' />  Edit Group details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <h6 className='text-center'>View and edit your details*</h6>
                    <Form.Group controlId='groupName'>
                        <Form.Label className='popup-label'>Group Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter group name'
                            value={formData.groupName}
                            onChange={(e) => setFormData({ ...formData, groupName: e.target.value })}
                            className='shadow-sm w-100'
                        />
                    </Form.Group>
                    <Form.Group controlId='groupDescription'>
                        <Form.Label className='popup-label pt-2'>Group Description</Form.Label>
                        <Form.Control
                            as='textarea'
                            rows={3}
                            placeholder='Enter group description'
                            value={formData.groupDescription}
                            onChange={(e) => setFormData({ ...formData, groupDescription: e.target.value })}
                            className='shadow-sm w-100'
                        />
                    </Form.Group>
                    <Form.Group controlId='selectFriends'>
                        <Form.Label className='popup-label pt-2'>Select Friends</Form.Label>
                        <div className='overflow-auto' style={{ height: "130px" }}>
                            {friends && friends.length > 0 ? (
                                friends.map((friend) => (
                                    <Form.Check
                                        key={friend.friendId}
                                        type='checkbox'
                                        id={`friend-checkbox-${friend.friendId}`}
                                        label={friend.name}
                                        checked={formData.selectedFriends.includes(friend.friendId)}
                                        onChange={() => handleCheckboxChange(friend.friendId)}
                                        className='m-2'
                                    />
                                ))
                            ) : (
                                <strong>No friends found</strong>
                            )}
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className='m-auto popup-button fw-bold shadow ' onClick={handleFormSubmit}>
                    <GrUpdate size={20} className='pb-1' /> &ensp;Update
                </Button>
                
            </Modal.Footer>
        </Modal>
    );
};
