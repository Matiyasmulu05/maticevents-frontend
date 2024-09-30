import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Optional: Create a separate CSS file for Navbar styles

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Event Planning Dashboard</div>
      <ul className="navbar-menu">
        <li><Link to="/events" className="navbar-link">Events</Link></li>
        <li><Link to="/project-management" className="navbar-link">Project Management</Link></li>
        <li><Link to="/onsite-management" className="navbar-link">Onsite Management</Link></li>
        <li><Link to="/reporting" className="navbar-link">Reporting</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;