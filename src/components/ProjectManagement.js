import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    task: '',
    startTime: '',
    endTime: '',
    status: '',
    financialTask: '',
    financialBudget: '',
    hrTask: '',
    hrNumber: '',
    vendorTask: '',
    vendor: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  // Fetch all project management records
  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/project-management`);
      setProjects(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create new project management entry
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/project-management`, formData);
      fetchProjects();
      setFormData({
        task: '',
        startTime: '',
        endTime: '',
        status: '',
        financialTask: '',
        financialBudget: '',
        hrTask: '',
        hrNumber: '',
        vendorTask: '',
        vendor: ''
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Delete project management entry
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/project-management/${id}`);
      fetchProjects();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="project-management-container">
      <h2>Project Management</h2>
      <form onSubmit={handleSubmit}>
        <input name="task" value={formData.task} onChange={handleChange} placeholder="Task" required />
        <input name="startTime" type="datetime-local" value={formData.startTime} onChange={handleChange} required />
        <input name="endTime" type="datetime-local" value={formData.endTime} onChange={handleChange} required />
        <input name="status" value={formData.status} onChange={handleChange} placeholder="Status" required />
        <input name="financialTask" value={formData.financialTask} onChange={handleChange} placeholder="Financial Task" required />
        <input name="financialBudget" type="number" value={formData.financialBudget} onChange={handleChange} placeholder="Financial Budget" required />
        <input name="hrTask" value={formData.hrTask} onChange={handleChange} placeholder="HR Task" required />
        <input name="hrNumber" type="number" value={formData.hrNumber} onChange={handleChange} placeholder="Number of HRs" required />
        <input name="vendorTask" value={formData.vendorTask} onChange={handleChange} placeholder="Vendor Task" required />
        <input name="vendor" value={formData.vendor} onChange={handleChange} placeholder="Assigned Vendor" required />
        <button type="submit">Create Project Management Entry</button>
      </form>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <p>{project.task} - {project.status}</p>
            <button onClick={() => handleDelete(project._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectManagement;