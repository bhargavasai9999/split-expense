import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsPersonCircle } from "react-icons/bs";
import 'bootstrap/dist/css/bootstrap.css';
import './module.profile.css';
import { FaEye } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";

export const ProfilePopup = ({show,close}) => {
  const [showpopup,setpopup]=useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const userProfile={
    name:"bhaargava sai",
    email:"sai@h.com",
    password:"bhargava"
  }
  const [formData, setFormData] = useState({
    name: userProfile.name,
    email: userProfile.email,
    password: userProfile.password,
  });
useEffect(()=>{
  setpopup(true);
})

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setFormData({
      name: userProfile.name,
      email: userProfile.email,
      password: userProfile.password,
    });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Modal show={show} onHide={close}>



      <Modal.Header closeButton>
        <Modal.Title>
        <FaEye size={30} className='mb-1'/>&ensp;View Profile
          
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="d-flex justify-content-center mb-4">
        <BsPersonCircle  size={80} className='shadow-sm bg-none br-10 profile-img-popup' />
        </div>
          <Form.Group controlId="formName ">

            <Form.Label className='d-inline fw-bold pt-1'>Name</Form.Label>
            {isEditing ? (
              <Form.Control
              
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className='shadow-sm'
              />
            ) : (
              <Form.Control  readOnly  defaultValue={formData.name}className='shadow-sm'
              />
            )}
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label className='fw-bold pt-1'>Email</Form.Label>
            {isEditing ? (
              <Form.Control
                type="email"
                name="email"
                defaultValue={formData.email}
                readOnly
                className='shadow-sm'
              />
            ) : (
              <Form.Control  readOnly defaultValue={formData.email} className='shadow-sm' />
            )}
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label className='fw-bold pt-1'>Password</Form.Label>
            {isEditing ? (
              <Form.Control
                type="text"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className='shadow-sm'
              />
            ) : (
              <Form.Control type="password" readOnly defaultValue={formData.password}  className='shadow-sm'/>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {!isEditing && (
          <Button className='popup-button' onClick={handleEditClick}>
            <AiOutlineEdit className="mr-2 shadow" />
            Edit
          </Button>
        )}
        {isEditing && (
          <Button className='shadow button-cancel' onClick={handleCancelClick}>
            <MdOutlineCancel size={25} />&ensp;Cancel
          </Button>
        )}
        {isEditing && (
            <Button  className="mx-4 shadow  button-save" onClick={handleSaveClick}>
             <GrUpdate />&ensp; update
            </Button>
          )}
      </Modal.Footer>
    </Modal>
  );
};
