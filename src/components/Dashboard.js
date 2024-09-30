import React from 'react';
import './Dashboard.css'; // Import the CSS file for styling

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Event Planning Dashboard</h1>
        <p>Your centralized platform for managing events efficiently.</p>
      </header>
      <section className="dashboard-content">
        <div className="dashboard-card">
          <h2>Overview</h2>
          <p>Get a quick overview of all your ongoing projects and events.</p>
        </div>
        <div className="dashboard-card">
          <h2>Quick Links</h2>
          <ul>
            <li>Events</li>
            <li>Project Management</li>
            <li>Onsite Management</li>
            <li>Reporting</li>
          </ul>
        </div>
        <div className="dashboard-card">
          <h2>Notifications</h2>
          <p>Stay updated with the latest alerts and notifications regarding your events.</p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;