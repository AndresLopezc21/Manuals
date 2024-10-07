import React, { useState } from 'react';
import { loginUser } from '../api/api'; // Asegúrate de que la ruta sea correcta

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Resetea el mensaje de error
  
    console.log('Enviando datos:', { username, password }); // Verifica los datos antes de enviarlos
  
    try {
      const user = await loginUser({ username, password });
      console.log('Respuesta recibida:', user); // Verifica la respuesta recibida
      onLogin(user); // Envía el usuario al componente padre si el login es exitoso
    } catch (error) {
      console.error('Error al iniciar sesión:', error.response ? error.response.data : error); // Muestra un error más detallado
      setErrorMessage('Error al iniciar sesión');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Muestra el mensaje de error */}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
