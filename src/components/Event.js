import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Event = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    description: '',
    when: '',
    where: '',
    budget: '',
    setupType: '',
    brandingType: ''
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch all events
  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/events`);
      setEvents(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create new event
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      await axios.post(`${process.env.REACT_APP_API_URL}/api/events`, formData);
      fetchEvents();
      setFormData({
        description: '',
        when: '',
        where: '',
        budget: '',
        setupType: '',
        brandingType: ''
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Delete event
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/events/${id}`);
      fetchEvents();
    } catch (error) {
      console.error(error);
    }
  };

  // Render component
  return (
    <div className="event-container">
      <h2>Events</h2>
      <form onSubmit={handleSubmit}>
        <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
        <input name="when" type="date" value={formData.when} onChange={handleChange} required />
        <input name="where" value={formData.where} onChange={handleChange} placeholder="Where" required />
        <input name="budget" type="number" value={formData.budget} onChange={handleChange} placeholder="Budget" required />
        <input name="setupType" value={formData.setupType} onChange={handleChange} placeholder="Setup Type" required />
        <input name="brandingType" value={formData.brandingType} onChange={handleChange} placeholder="Branding Type" required />
        <button type="submit">Create Event</button>
      </form>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <p>{event.description} - {event.when}</p>
            <button onClick={() => handleDelete(event._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Event;