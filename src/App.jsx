import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './view/RegisterPage.jsx';
import LoginPage from './view/LoginPage.jsx';
import { AuthProvider } from './controller/AuthContext.jsx';
import { StudentPage } from './view/studentPage.jsx'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/add-user" element={<h1>agregar usuario</h1>} />
          <Route path="/profile" element={<h1>perfil</h1>} />
          <Route path="/user/:id" element={<h1>actualizar usuario</h1>} />
          <Route path="/" element={<StudentPage />} />
          


        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;