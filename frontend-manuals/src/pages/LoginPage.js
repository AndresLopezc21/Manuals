// src/pages/LoginPage.js
import React, { useState } from 'react';
import { loginUser } from '../api/api';

const LoginPage = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(username, password);
      setToken(data.token); // Asegúrate de que el token se almacene en un estado o contexto
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          placeholder="Usuario" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Iniciar Sesión</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;