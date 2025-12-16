import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SimpleHomePage from './SimpleHomePage';
import SimpleLogin from './SimpleLogin';
import Register from './pages/Register';
import SimpleHospitalList from './SimpleHospitalList';
import SimpleAddHospital from './SimpleAddHospital';
import TestComponent from './TestComponent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SimpleHomePage />} />
        <Route path="/login" element={<SimpleLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hospitals" element={<SimpleHospitalList />} />
        <Route path="/add-hospital" element={<SimpleAddHospital />} />
        <Route path="/test" element={<TestComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
