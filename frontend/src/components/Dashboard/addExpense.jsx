
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, InputGroup, FormControl, Badge } from 'react-bootstrap';
import './expense.css';
import { add_Expense } from '../../controllers/dashboard.controller';
import {  useToasts } from 'react-toast-notifications';
import api from '../../apis/axiosConfig';
import config from '../../apis/config';
const groupsList = ["Goa Trip","pondi trip","hstl boys"];
export const CreatePopup = ({ show, onClose,friends,groups }) => {
    const [formData, setFormData] = useState({
        title:"",
        description: '',
        amount: '',
        selectedFriends: [],
        selectedGroups: [],
        friendSearchQuery: '',
        groupSearchQuery: '',
    });
    const friendsList = friends;

    const { addToast } = useToasts();



  const handleFriendCheckboxChange = (friend) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedFriends: prevData.selectedFriends.includes(friend)
        ? prevData.selectedFriends.filter(
            (selectedFriend) => selectedFriend !== friend
          )
        : [...prevData.selectedFriends, friend],
    }))
  }

  const handleGroupCheckboxChange = (group) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedGroups: prevData.selectedGroups.includes(group)
        ? prevData.selectedGroups.filter(
            (selectedGroup) => selectedGroup !== group
          )
        : [...prevData.selectedGroups, group],
    }))
  }

  const handleFriendSearchQueryChange = (e) => {
    setFormData({ ...formData, friendSearchQuery: e.target.value })
  }

  const handleGroupSearchQueryChange = (e) => {
    setFormData({ ...formData, groupSearchQuery: e.target.value })
  }

    const filteredFriends = friendsList.filter(
        (friend) =>
            formData?.friendSearchQuery.length > 0 ?
            friend?.name.toLowerCase().includes(formData.friendSearchQuery.toLowerCase()):
            friend?.name.includes(friend.name)

    );

    const filteredGroups = groupsList.filter(
        (group) =>
            formData.groupSearchQuery &&
            group.toLowerCase().includes(formData.groupSearchQuery.toLowerCase())
    );

    const handleFormSubmit = () => {
        if( formData.amount>0 && formData.selectedFriends?.length >0 && formData.title.length>0 && formData.description.length>0){
            
             api.post("/splitExpense",{title:formData.title,description:formData.description,amount:formData.amount,friendIds:formData.selectedFriends},config).then((res)=>{
                 addToast("splitted successfully",{appearance:"success"})
            }).catch((err)=>{
                addToast("Something went wrong",{appearance:'error'})
        }) 
        }
        else{
            addToast("Enter valid details", { appearance: 'warning' });
        }
        setFormData({
            title:"",
            description: '',
            amount: '',
            selectedFriends: [],
            selectedGroups: [],
            friendSearchQuery: '',
            groupSearchQuery: '',
        });
        onClose();
    };
   

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title >Add Expense</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                <Form.Group controlId='title'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter expense title'
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        
                        required/>
                    </Form.Group>
                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter expense description'
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId='amount'>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Enter amount'
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            min="1"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId='selectFriends'>
                        <Form.Label>Select Friends</Form.Label>
                        <InputGroup className='mb-0'>
                            <FormControl
                                placeholder='Search friend...'
                                value={formData.friendSearchQuery}
                                onChange={handleFriendSearchQueryChange}
                                className='bold'
                                required
                            />
                        </InputGroup>
                        { (
                            <div className='checklist-container'>
                                {filteredFriends.map((friend) => (
                                    <Form.Check
                                        key={friend.friendId}
                                        type='checkbox'
                                        id={`friend-checkbox-${friend.friendId}`}
                                        label={friend.name}
                                        checked={formData.selectedFriends.includes(friend.friendId)}
                                        onChange={() => handleFriendCheckboxChange(friend.friendId)}
                                        className='m-2'
                                    />
                                ))}
                            </div>
                        )}
                        {formData.selectedFriends.length > 0 && (
                            <div>
                                <Form.Label>Selected Friends:</Form.Label>
                                <div className='overflow-auto' style={{maxHeight:"80px"}}>
                                    {formData.selectedFriends.map((friend) => (
                                        <Badge key={friend} pill variant='info' className='mx-1'>
                                            {friend}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </Form.Group>
                    {/* <Form.Group controlId='selectGroups'>
                        <Form.Label>Select Groups</Form.Label>
                        <InputGroup className='mb-3'>
                            <FormControl
                                placeholder='Search groups...'
                                value={formData.groupSearchQuery}
                                onChange={handleGroupSearchQueryChange}
                            />
                        </InputGroup>
                        {formData.groupSearchQuery && (
                            <div className='checklist-container'>
                                {filteredGroups.map((group, index) => (
                                    <Form.Check
                                        key={index}
                                        type='checkbox'
                                        id={`group-checkbox-${index}`}
                                        label={group}
                                        checked={formData.selectedGroups.includes(group)}
                                        onChange={() => handleGroupCheckboxChange(group)}
                                        className='m-2'
                                    />
                                ))}
                            </div>
                        )}
                        {formData.selectedGroups.length > 0 && (
                            <div>
                                <Form.Label>Selected Groups:</Form.Label>
                                <div>
                                    {formData.selectedGroups.map((group) => (
                                        <Badge key={group} pill variant='info' className='mr-2'>
                                            {group}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </Form.Group> */}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onClose}>
                    Cancel
                </Button>
                <Button variant='primary' onClick={handleFormSubmit}>
                    Add Expense
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
