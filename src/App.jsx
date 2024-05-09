import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './view/RegisterPage.jsx';
import HomePage from './view/homePage.jsx';
import Admin from './view/Admin.jsx';
import LoginPage from './view/LoginPage.jsx';
import LoginPageAdmin from './view/LoginPageAdmin';
import { AuthProvider } from './controller/AuthContext.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <AuthProvider>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/login-admin" element={<LoginPageAdmin />} />
          <Route path="/admin-page" element={<Admin />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<HomePage />} />
          <Route path="/" element={<LoginPageAdmin />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;