import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GuestManagement = () => {
  const [guests, setGuests] = useState([]);
  const [formData, setFormData] = useState({
    guestName: '',
    address: '',
    invitationLetter: '',
    rsvpStatus: '',
    seatNumber: ''
  });

  useEffect(() => {
    fetchGuests();
  }, []);

  // Fetch all guest management records
  const fetchGuests = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/guest-management`);
      setGuests(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create new guest management entry
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/guest-management`, formData);
      fetchGuests();
      setFormData({
        guestName: '',
        address: '',
        invitationLetter: '',
        rsvpStatus: '',
        seatNumber: ''
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Delete guest management entry
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/guest-management/${id}`);
      fetchGuests();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="guest-management-container">
      <h2>Guest Management</h2>
      <form onSubmit={handleSubmit}>
        <input name="guestName" value={formData.guestName} onChange={handleChange} placeholder="Guest Name" required />
        <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
        <textarea name="invitationLetter" value={formData.invitationLetter} onChange={handleChange} placeholder="Invitation Letter" required />
        <input name="rsvpStatus" value={formData.rsvpStatus} onChange={handleChange} placeholder="RSVP Status" required />
        <input name="seatNumber" type="number" value={formData.seatNumber} onChange={handleChange} placeholder="Seat Number" required />
        <button type="submit">Create Guest Entry</button>
      </form>
      <ul>
        {guests.map((guest) => (
          <li key={guest._id}>
            <p>{guest.guestName} - {guest.rsvpStatus}</p>
            <button onClick={() => handleDelete(guest._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GuestManagement;