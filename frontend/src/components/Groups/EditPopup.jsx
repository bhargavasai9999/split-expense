import 'bootstrap/dist/css/bootstrap.css';
import './module.groups.css';
import { GrUpdate } from "react-icons/gr";

import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


export const EditPopup = ({ show, onClose,data,list }) => {
    const friendsList =list;
    const [formData, setFormData] = useState({
        groupName: data.groupName,
        groupDescription: data.groupDescription,
        selectedFriends: data.selectedFriend,
    });
   

    const handleCheckboxChange = (friend) => {
        setFormData((prevData) => ({
            ...prevData,
            selectedFriends: prevData.selectedFriends.includes(friend)
                ? prevData.selectedFriends.filter((selectedFriend) => selectedFriend !== friend)
                : [...prevData.selectedFriends, friend],
        }));
    };

    const handleFormSubmit = () => {
        console.log('Form submitted with edited data:', formData);
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
                <Modal.Title><GrUpdate size={20} className='pb-1' />  Edit Group details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <h6 className='text-center'>view and edit your details</h6>
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
                    <Form.Group controlId='selectFriends' className='scrollable-checklist'>
                        <Form.Label className='popup-label pt-2'>Select Friends</Form.Label>
                        <div className='checklist-container'>
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
                <GrUpdate size={20} className='pb-1' /> &ensp;Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
