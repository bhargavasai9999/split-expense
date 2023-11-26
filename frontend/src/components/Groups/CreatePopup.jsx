import 'bootstrap/dist/css/bootstrap.css';
import './module.groups.css';
import { IoCreate } from "react-icons/io5";

import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


export const CreatePopup = ({ show, onClose,list }) => {
    const [formData, setFormData] = useState({
        groupName: '',
        groupDescription: '',
        selectedFriends: [],
    });
    const friendsList =list;

    const handleCheckboxChange = (friend) => {
        setFormData((prevData) => ({
            ...prevData,
            selectedFriends: prevData.selectedFriends.includes(friend)
                ? prevData.selectedFriends.filter((selectedFriend) => selectedFriend !== friend)
                : [...prevData.selectedFriends, friend],
        }));
    };

    const handleFormSubmit = () => {
        console.log('Form submitted with data:', formData);
        setFormData({
            groupName: '',
            groupDescription: '',
            selectedFriends: [],
        });
        onClose();
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title><IoCreate className='mb-2' size={25} /> Create Group</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <h6 className='text-center'>Make group to split bills and expenses*</h6>
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
                    <Form.Group controlId='selectFriends' >
                        <Form.Label className='popup-label pt-2'>Select Friends</Form.Label>
                        <div className='overflow-auto pointer' style={{height:"130px"}}>                        
                            
                            {friendsList.map((friend, index) => (
                                <Form.Check
                                    key={index}
                                    type='checkbox'
                                    id={`friend-checkbox-${index}`}
                                    label={friend}
                                    checked={formData.selectedFriends.includes(friend)}
                                    onChange={() => handleCheckboxChange(friend)}
                                    className='m-2'
                                />
                            ))}
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className='m-auto popup-button fw-bold ' onClick={handleFormSubmit}>
                <IoCreate className='pb-1' size={25} />&ensp; Create
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
