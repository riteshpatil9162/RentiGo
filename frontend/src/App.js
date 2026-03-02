import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import AddProperty from './pages/AddProperty';
import MyBookings from './pages/MyBookings';
import SavedProperties from './pages/SavedProperties';
import AdminProperties from './pages/AdminProperties';
import MyProperties from './pages/MyProperties';
import TestAPI from './pages/TestAPI';
import About from './pages/About';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';
import Help from './pages/Help';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:id" element={<PropertyDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/help" element={<Help />} />
            <Route path="/test-api" element={<TestAPI />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/add-property" element={<PrivateRoute><AddProperty /></PrivateRoute>} />
            <Route path="/my-properties" element={<PrivateRoute><MyProperties /></PrivateRoute>} />
            <Route path="/my-bookings" element={<PrivateRoute><MyBookings /></PrivateRoute>} />
            <Route path="/saved" element={<PrivateRoute><SavedProperties /></PrivateRoute>} />
            <Route path="/admin/properties" element={<PrivateRoute><AdminProperties /></PrivateRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
