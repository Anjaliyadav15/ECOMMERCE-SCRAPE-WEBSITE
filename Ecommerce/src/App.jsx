// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Website from './components/Website';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Website />} />
      </Routes>
    </Router>
  );
}

export default App;

