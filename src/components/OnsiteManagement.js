import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OnsiteManagement = () => {
  const [onsites, setOnsites] = useState([]);
  const [formData, setFormData] = useState({
    brandingTask: '',
    qualityColor: '',
    placementStatus: '',
    item: '',
    numberOfItems: '',
    orderedItems: '',
    deliveredItems: '',
    guestName: '',
    registrationStatus: ''
  });

  useEffect(() => {
    fetchOnsites();
  }, []);

  // Fetch all onsite management records
  const fetchOnsites = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/onsite-management`);
      setOnsites(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create new onsite management entry
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/onsite-management`, formData);
      fetchOnsites();
      setFormData({
        brandingTask: '',
        qualityColor: '',
        placementStatus: '',
        item: '',
        numberOfItems: '',
        orderedItems: '',
        deliveredItems: '',
        guestName: '',
        registrationStatus: ''
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Delete onsite management entry
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/onsite-management/${id}`);
      fetchOnsites();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="onsite-management-container">
      <h2>Onsite Management</h2>
      <form onSubmit={handleSubmit}>
        <input name="brandingTask" value={formData.brandingTask} onChange={handleChange} placeholder="Branding Task" required />
        <input name="qualityColor" value={formData.qualityColor} onChange={handleChange} placeholder="Quality Color" required />
        <input name="placementStatus" value={formData.placementStatus} onChange={handleChange} placeholder="Placement Status" required />
        <input name="item" value={formData.item} onChange={handleChange} placeholder="Item" required />
        <input name="numberOfItems" type="number" value={formData.numberOfItems} onChange={handleChange} placeholder="Number of Items" required />
        <input name="orderedItems" value={formData.orderedItems} onChange={handleChange} placeholder="Ordered Items" required />
        <input name="deliveredItems" value={formData.deliveredItems} onChange={handleChange} placeholder="Delivered Items" required />
        <input name="guestName" value={formData.guestName} onChange={handleChange} placeholder="Guest Name" required />
        <input name="registrationStatus" value={formData.registrationStatus} onChange={handleChange} placeholder="Registration Status" required />
        <button type="submit">Create Onsite Management Entry</button>
      </form>
      <ul>
        {onsites.map((onsite) => (
          <li key={onsite._id}>
            <p>{onsite.brandingTask} - {onsite.placementStatus}</p>
            <button onClick={() => handleDelete(onsite._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OnsiteManagement;