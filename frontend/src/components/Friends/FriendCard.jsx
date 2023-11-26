import React, { useState } from 'react';
import { IoMdPersonAdd } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import { CgProfile } from 'react-icons/cg';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaPeopleRobbery } from "react-icons/fa6";


import 'bootstrap/dist/css/bootstrap.css';
import './module.friendcard.css';

export const FriendCard = () => {
  const [friends, setFriends] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    {
      id: 2,
      name: 'Johnfge Doe',
      email: 'john.doe@example.com',
    },
  ]);

  const [showAddFriendPopup, setShowAddFriendPopup] = useState(false);
  const [alert,setalert]=useState(false);
  const [newFriendEmail, setNewFriendEmail] = useState('');

  const handleDelete = (id) => {
    setFriends((prevFriends) => prevFriends.filter((friend) => friend.id !== id));
  };

  const handleAddFriend = () => {
    setShowAddFriendPopup(true);
  };

  const handleCancelAddFriend = () => {
    setShowAddFriendPopup(false);
    setNewFriendEmail('');
  };

  const handleSaveFriend = () => {
    setalert(true);
    setShowAddFriendPopup(false);
    setNewFriendEmail('');
  };

  return (
    <div className="text-center flex justify-content-center col-10">
      <div className="d-flex justify-content-evenly mt-3 ">
        <h2 className="friendcard-heading fw-bold"><FaPeopleRobbery size={30} className='pb-1' />&ensp;Your Friends</h2>
        <button className="btn delete-button p-2 font-weight-bold shadow-sm" onClick={handleAddFriend}>
          <IoMdPersonAdd size={25} color="black" /> Add friend
        </button>
      </div>

      <div className="d-flex justify-content-center m-4 col-12">
        <table id="friends shadow">
          <thead className="table-row">
            <tr className="table-headings p-3">
              <th className="table-headings p-3"></th>
              <th className="table-headings p-3">Name</th>
              <th className="table-headings p-3">Email</th>
              <th className="table-headings p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {friends.length > 0 ? (
              friends.map((friend) => (
                <tr key={friend.id} className="shadow rounded-row">
                  <td className='pl-8 text-center'>
                    <CgProfile size={30} color="red" />
                  </td>
                  <td className="text-danger text-center">{friend.name}</td>
                  <td>{friend.email}</td>
                  <td>
                    <button className="delete-button" onClick={() => handleDelete(friend.id)}>
                      <RxCross2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <h4 colSpan="4" className="d-flex justify-content-center text-center">
                  No Friends found
                </h4>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {false && <div className=" rounded  popup  popup-content" role="alert">
      <button type="button" className="close ml-3 bg-info border-0" data-dismiss="alert" aria-label="Close" onClick={()=>{setalert(false)}}>
    <span aria-hidden="true">&times;</span>
  </button>
  <strong>Alert!</strong> error in handling
  
</div>}
      {/* Add Friend Pop-up */}
      {showAddFriendPopup && (
        <div className="popup shadow">
          
          <div className="popup-content">
          <IoMdCloseCircleOutline onClick={handleCancelAddFriend} size={30} className='mb-2 d-flex justify-content-start shadow-sm rounded-pill'/>
            <div className=''>
            <h2 className='d-inline mt-3'> &nbsp;Add Your Friend </h2>
            <h5 className='p-2'>Enter your Friend Email who have split expense account..!</h5>
            </div>
            <label className='popup-label text-start mb-1'>Friend's Email:</label><br/>
            <input
              type="email"
              value={newFriendEmail}
              onChange={(e) => setNewFriendEmail(e.target.value)}
            className='popup-input shadow-p' placeholder="Enter your Friend Email" /> <br/>
            <button onClick={handleSaveFriend} className='btn popup-button shadow  mt-4'><IoMdPersonAdd size={20} style={{cursor:"pointer"}}/> Add</button>
          </div>
        </div>
      )}
    </div>
  );
};
