import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importing components
import HomePage from './components/Page_Home';
import Login from './components/Page_Login';
import SignUp from './components/Page_SignUp';

const App = () => (
  <Router>
    <Routes>
      {/* Set HomePage as the default */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  </Router>
);

export default App;
