import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Event from './components/Event';
import ProjectManagement from './components/ProjectManagement';
import GuestManagement from './components/GuestManagement';
import OnsiteManagement from './components/OnsiteManagement';
import Reporting from './components/Reporting';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Include Navbar here */}

        <Routes className="App">
         <Route className="App" path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/events" element={<Event />} />
          <Route path="/project-management" element={<ProjectManagement />} />
          <Route path="/guest-management" element={<GuestManagement />} />
          <Route path="/onsite-management" element={<OnsiteManagement />} />
          <Route path="/reporting" element={<Reporting />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;