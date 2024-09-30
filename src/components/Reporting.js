import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reporting = () => {
  const [reports, setReports] = useState([]);
  const [formData, setFormData] = useState({
    question: '',
    response: '',
    financialTask: '',
    utilizedBudget: '',
    numberOfParticipants: ''
  });

  useEffect(() => {
    fetchReports();
  }, []);

  // Fetch all reporting records
  const fetchReports = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/reporting`);
      setReports(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create new reporting entry
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/reporting`, formData);
      fetchReports();
      setFormData({
        question: '',
        response: '',
        financialTask: '',
        utilizedBudget: '',
        numberOfParticipants: ''
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Delete reporting entry
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/reporting/${id}`);
      fetchReports();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="reporting-container">
      <h2>Reporting</h2>
      <form onSubmit={handleSubmit}>
        <input name="question" value={formData.question} onChange={handleChange} placeholder="Survey Question" required />
        <textarea name="response" value={formData.response} onChange={handleChange} placeholder="Response" required />
        <input name="financialTask" value={formData.financialTask} onChange={handleChange} placeholder="Financial Task" required />
        <input name="utilizedBudget" type="number" value={formData.utilizedBudget} onChange={handleChange} placeholder="Utilized Budget" required />
        <input name="numberOfParticipants" type="number" value={formData.numberOfParticipants} onChange={handleChange} placeholder="Number of Participants" required />
        <button type="submit">Create Report Entry</button>
      </form>
      <ul>
        {reports.map((report) => (
          <li key={report._id}>
            <p>{report.question} - {report.response}</p>
            <button onClick={() => handleDelete(report._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reporting;